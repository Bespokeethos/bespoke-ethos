import { NextRequest, NextResponse } from "next/server";

type Body = {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
  useCase?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  consent?: string | boolean;
  captchaToken?: string;
  successRedirect?: string;
  errorRedirect?: string;
};

type ContactMeta = {
  ip: string;
  userAgent: string;
  useCase?: string;
  budget?: string;
  timeline?: string;
  consent: boolean;
  submittedAt: string;
};

type NormalizedContact = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  meta: ContactMeta;
};

type ExternalResult = {
  ok: boolean;
  status: number;
  code?: string;
  error?: string;
  recordId?: string;
};

const FRONTEND_URL =
  process.env.FRONTEND_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://www.bespokeethos.com";

function sanitize(value: unknown): string {
  if (value == null) return "";
  return String(value).slice(0, 2000).trim();
}

function withCors(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", FRONTEND_URL);
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

function validationError(
  message: string,
  isFormPost: boolean,
  req: NextRequest,
  errorRedirect?: string,
) {
  const timestamp = new Date().toISOString();
  if (isFormPost) {
    const url = new URL(errorRedirect ?? "/contact?error=1", req.url);
    return withCors(NextResponse.redirect(url, { status: 303 }));
  }
  return withCors(
    NextResponse.json(
      { success: false, error: message, code: "VALIDATION_ERROR", timestamp },
      { status: 400 },
    ),
  );
}

export async function POST(req: NextRequest) {
  const forwardedFor = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim();
  const requestIp = (req as { ip?: string | null }).ip ?? undefined;
  const ip = forwardedFor || requestIp || "unknown";

  const nowMs = Date.now();
  const bucket = getBucket(ip);
  if (bucket.count >= 10 && nowMs - bucket.ts < 60_000) {
    const timestamp = new Date().toISOString();
    const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
    const isFormPost =
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data");

    if (isFormPost) {
      const url = new URL("/contact?error=1", req.url);
      return withCors(NextResponse.redirect(url, { status: 303 }));
    }

    return withCors(
      NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again in a minute.",
          code: "RATE_LIMIT",
          timestamp,
        },
        { status: 429 },
      ),
    );
  }
  if (nowMs - bucket.ts >= 60_000) {
    bucket.count = 0;
    bucket.ts = nowMs;
  }
  bucket.count++;

  const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
  const isFormPost =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  let successRedirect: string | undefined;
  let errorRedirect: string | undefined;

  try {
    let data: Body;

    if (isFormPost) {
      const formData = await req.formData();
      successRedirect = sanitize(formData.get("successRedirect"));
      errorRedirect = sanitize(formData.get("errorRedirect"));

      data = {
        name: sanitize(formData.get("name")),
        email: sanitize(formData.get("email")),
        company: sanitize(formData.get("company")),
        useCase: sanitize(formData.get("useCase")),
        budget: sanitize(formData.get("budget")),
        timeline: sanitize(formData.get("timeline")),
        message: sanitize(formData.get("message")),
        consent: formData.get("consent")?.toString() ?? "",
        captchaToken: sanitize(formData.get("cf-turnstile-response")),
      };
    } else {
      const json = (await req.json()) as Body;
      successRedirect = json.successRedirect;
      errorRedirect = json.errorRedirect;
      data = json;
    }

    // Optional: verify Cloudflare Turnstile
    // Controlled via CONTACT_ENABLE_TURNSTILE to avoid blocking
    // submissions while Airtable integration is being verified.
    const turnstileEnabled =
      process.env.CONTACT_ENABLE_TURNSTILE === "1";
    const turnstileSecret = process.env.TURNSTILE_SECRET;
    const captchaToken = sanitize(data.captchaToken);
    if (turnstileEnabled && turnstileSecret && captchaToken) {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            secret: turnstileSecret,
            response: captchaToken,
          }),
        },
      );
      const verify = (await verifyRes.json()) as { success?: boolean };
      if (!verify.success) {
        return validationError(
          "Captcha failed. Please try again.",
          isFormPost,
          req,
          errorRedirect,
        );
      }
    }

    const timestamp = new Date().toISOString();
    const userAgent = sanitize(req.headers.get("user-agent"));
    const email = sanitize(data.email);
    const phone = sanitize((data as Body).phone);
    const company = sanitize(data.company);
    const message = sanitize(data.message || "");
    const useCase = sanitize(data.useCase);
    const rawBudget = sanitize(data.budget);
    const budget = rawBudget || "Not sure yet";
    const timeline = sanitize(data.timeline);
    const consentFlag =
      typeof data.consent === "boolean"
        ? data.consent
        : Boolean(sanitize(data.consent));

    const firstNameRaw = sanitize((data as Body).firstName);
    const lastNameRaw = sanitize((data as Body).lastName);
    const fullName = sanitize(data.name);

    let firstName = firstNameRaw;
    let lastName = lastNameRaw;

    if (!firstName || !lastName) {
      const baseName = fullName || `${firstNameRaw} ${lastNameRaw}`.trim();
      if (baseName) {
        const parts = baseName.split(/\s+/);
        const firstPart = parts[0];
        const remaining = parts.slice(1).join(" ");
        if (!firstName && firstPart) {
          firstName = firstPart;
        }
        if (!lastName) {
          lastName = remaining || "(not provided)";
        }
      }
    }

    firstName = firstName || "(not provided)";
    lastName = lastName || "(not provided)";

    const errors: string[] = [];
    if (!firstName || firstName === "(not provided)") {
      errors.push("First name is required.");
    }
    if (!email) {
      errors.push("Email is required.");
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errors.push("Email address is invalid.");
      }
    }
    if (!message || message.length < 10) {
      errors.push("Message must be at least 10 characters.");
    }

    if (errors.length > 0) {
      return validationError(errors.join(" "), isFormPost, req, errorRedirect);
    }

    const contact: NormalizedContact = {
      firstName,
      lastName,
      email,
      phone,
      company,
      message,
      meta: {
        ip,
        userAgent,
        useCase,
        budget,
        timeline,
        consent: consentFlag,
        submittedAt: timestamp,
      },
    };

    console.info(
      "[CONTACT_FORM_SUBMISSION] Normalized contact",
      JSON.stringify({
        timestamp,
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        meta: contact.meta,
      }),
    );

    // Execute Airtable + (optionally) Resend in parallel and wait BEFORE responding.
    // Email sending is gated by CONTACT_ENABLE_EMAIL; by default, only Airtable
    // must succeed for the request to be treated as successful.
    const emailEnabled = process.env.CONTACT_ENABLE_EMAIL === "1";

    const [airtableResult, emailResult] = await Promise.all([
      sendToAirtable(contact),
      emailEnabled
        ? sendConfirmationEmail(contact)
        : Promise.resolve<ExternalResult>({ ok: true, status: 200 }),
    ]);

    const allOk = airtableResult.ok && emailResult.ok;
    const primaryError = !airtableResult.ok ? airtableResult : emailResult;
    const status = primaryError.status ?? 500;

    if (!allOk) {
      const code = primaryError.code || "EXTERNAL_SERVICE_ERROR";
      const errorMessage =
        primaryError.error ||
        "We couldn't process your request right now. Please try again shortly.";

      console.error(
        "[CONTACT_FORM_SUBMISSION] External service failure",
        JSON.stringify({ code, status, error: errorMessage }),
      );

      if (isFormPost) {
        const url = new URL(errorRedirect ?? "/contact?error=1", req.url);
        url.searchParams.set("code", code);
        return withCors(NextResponse.redirect(url, { status: 303 }));
      }

      return withCors(
        NextResponse.json(
          {
            success: false,
            error: errorMessage,
            code,
            timestamp,
          },
          { status },
        ),
      );
    }

    const successPayload = {
      success: true,
      message: "Contact form submitted successfully",
      recordId: airtableResult.recordId ?? null,
      timestamp,
    };

    if (isFormPost) {
      const url = new URL(successRedirect ?? "/contact?sent=1", req.url);
      return withCors(NextResponse.redirect(url, { status: 303 }));
    }

    return withCors(NextResponse.json(successPayload, { status: 200 }));
  } catch (error) {
    console.error("[CONTACT_FORM_SUBMISSION] Unexpected error", error);
    const timestamp = new Date().toISOString();

    if (isFormPost) {
      const url = new URL(errorRedirect ?? "/contact?error=1", req.url);
      return withCors(NextResponse.redirect(url, { status: 303 }));
    }

    return withCors(
      NextResponse.json(
        {
          success: false,
          error: "Invalid request payload.",
          code: "UNEXPECTED_ERROR",
          timestamp,
        },
        { status: 400 },
      ),
    );
  }
}

async function sendToAirtable(
  contact: NormalizedContact,
): Promise<ExternalResult> {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName =
    process.env.AIRTABLE_TABLE_NAME ||
    process.env.AIRTABLE_CONTACT_TABLE_ID ||
    process.env.AIRTABLE_CONTACT_ID;

  if (!apiKey || !baseId || !tableName) {
    console.error(
      "[CONTACT_FORM_SUBMISSION] Airtable configuration missing. Check AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME / AIRTABLE_CONTACT_TABLE_ID.",
    );
    return {
      ok: false,
      status: 500,
      code: "AIRTABLE_CONFIG_ERROR",
      error: "Airtable configuration is missing.",
    };
  }

  const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
    tableName,
  )}`;

  // Extract just the date portion (YYYY-MM-DD) for Airtable's date field
  const submittedDate = contact.meta.submittedAt.split("T")[0];

  const fields: Record<string, unknown> = {
    "First Name": contact.firstName,
    "Last name": contact.lastName,
    Email: contact.email,
    Message: contact.message,
    Consent: contact.meta.consent,
    "Submitted at": submittedDate,
    Status: "NEW",
  };

  if (contact.phone) {
    fields["Phone"] = contact.phone;
  }
  if (contact.company) {
    fields["Company"] = contact.company;
  }
  if (contact.meta.useCase) {
    fields["Use Case"] = contact.meta.useCase;
  }
  if (contact.meta.budget) {
    fields["Budget"] = contact.meta.budget;
  }
  if (contact.meta.timeline) {
    fields["Timeline"] = contact.meta.timeline;
  }

  console.info(
    "[CONTACT_FORM_SUBMISSION] Sending record to Airtable",
    JSON.stringify({ url, fields: { ...fields, Message: "[redacted]" } }),
  );

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    });

    const text = await res.text();

    if (res.status === 429) {
      console.error(
        "[CONTACT_FORM_SUBMISSION] Airtable rate limit reached",
        text,
      );
      return {
        ok: false,
        status: 429,
        code: "AIRTABLE_RATE_LIMIT",
        error: "Rate limit exceeded when writing to Airtable.",
      };
    }

    if (res.status === 401) {
      console.error(
        "[CONTACT_FORM_SUBMISSION] Airtable authentication error",
        text,
      );
      return {
        ok: false,
        status: 401,
        code: "AIRTABLE_AUTH_ERROR",
        error: "Airtable authentication failed.",
      };
    }

    if (!res.ok) {
      console.error(
        "[CONTACT_FORM_SUBMISSION] Airtable non-200 response",
        text,
      );
      return {
        ok: false,
        status: res.status || 500,
        code: "AIRTABLE_ERROR",
        error: "Failed to create record in Airtable.",
      };
    }

    let recordId: string | undefined;
    try {
      const parsed = JSON.parse(text) as { id?: string };
      recordId = parsed.id;
    } catch {
      // ignore parse error; we already know it's OK
    }

    console.info(
      `[CONTACT_FORM_SUBMISSION] Saved to Airtable successfully${
        recordId ? ` (record ${recordId})` : ""
      }`,
    );

    return { ok: true, status: 200, recordId };
  } catch (err) {
    console.error(
      "[CONTACT_FORM_SUBMISSION] Network or Airtable error",
      err,
    );
    return {
      ok: false,
      status: 500,
      code: "AIRTABLE_NETWORK_ERROR",
      error: "Airtable request failed.",
    };
  }
}

async function sendConfirmationEmail(
  contact: NormalizedContact,
): Promise<ExternalResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || "contact@bespokeethos.com";

  if (!apiKey) {
    console.error(
      "[CONTACT_FORM_SUBMISSION] RESEND_API_KEY missing; cannot send email.",
    );
    return {
      ok: false,
      status: 500,
      code: "RESEND_CONFIG_ERROR",
      error: "Email configuration is missing.",
    };
  }

  const fromAddress = `Bespoke Ethos <${fromEmail}>`;
  const toAddresses = [contact.email];

  // Also send internal notification
  const internalEmail = "contact@bespokeethos.com";
  if (internalEmail && internalEmail !== contact.email) {
    toAddresses.push(internalEmail);
  }

  const submittedAt = contact.meta.submittedAt;

  const html = `
    <div style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #0f172a;">
      <h2 style="margin-bottom: 0.5rem;">Thanks for reaching out, ${contact.firstName}.</h2>
      <p>We received your message at Bespoke Ethos and will get back to you within one business day.</p>
      <p style="margin-top: 1rem; font-weight: 500;">HereΓÇÖs what you sent:</p>
      <p><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      ${contact.company ? `<p><strong>Company:</strong> ${contact.company}</p>` : ""}
      ${contact.phone ? `<p><strong>Phone:</strong> ${contact.phone}</p>` : ""}
      ${
        contact.meta.useCase
          ? `<p><strong>What youΓÇÖre hoping to achieve:</strong> ${contact.meta.useCase}</p>`
          : ""
      }
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-line; padding: 0.75rem 1rem; border-radius: 0.75rem; background: #f1f5f9; border: 1px solid #e2e8f0;">
        ${contact.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </p>
      <p style="margin-top: 1.5rem; font-size: 12px; color: #64748b;">
        Submitted at ${submittedAt}. IP: ${contact.meta.ip}. User agent: ${contact.meta.userAgent}
      </p>
      <p style="margin-top: 0.5rem; font-size: 12px; color: #64748b;">
        If you didnΓÇÖt submit this form, you can safely ignore this email.
      </p>
    </div>
  `;

  console.info("[CONTACT_FORM_SUBMISSION] Sending email via Resend");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress,
        to: toAddresses,
        subject: "We received your message at Bespoke Ethos",
        html,
        reply_to: "noreply@bespokeethos.com",
      }),
    });

    const text = await res.text();

    if (res.status === 429) {
      console.error(
        "[CONTACT_FORM_SUBMISSION] Resend rate limit reached",
        text,
      );
      return {
        ok: false,
        status: 429,
        code: "RESEND_RATE_LIMIT",
        error: "Rate limit exceeded when sending email.",
      };
    }

    if (res.status === 401) {
      console.error(
        "[CONTACT_FORM_SUBMISSION] Resend authentication error",
        text,
      );
      return {
        ok: false,
        status: 401,
        code: "RESEND_AUTH_ERROR",
        error: "Email authentication failed.",
      };
    }

    if (!res.ok) {
      console.error(
        "[CONTACT_FORM_SUBMISSION] Resend non-200 response",
        text,
      );
      return {
        ok: false,
        status: res.status || 500,
        code: "RESEND_ERROR",
        error: "Failed to send confirmation email.",
      };
    }

    console.info("[CONTACT_FORM_SUBMISSION] Email sent successfully via Resend");
    return { ok: true, status: 200 };
  } catch (err) {
    console.error(
      "[CONTACT_FORM_SUBMISSION] Network or Resend error",
      err,
    );
    return {
      ok: false,
      status: 500,
      code: "RESEND_NETWORK_ERROR",
      error: "Resend request failed.",
    };
  }
}

// Fallback handlers for non-POST
export async function GET() {
  return withCors(
    NextResponse.json({ error: "Method Not Allowed" }, { status: 405 }),
  );
}

export async function OPTIONS() {
  const res = new NextResponse(null, { status: 204 });
  res.headers.set("Access-Control-Allow-Origin", FRONTEND_URL);
  res.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
}

// naive per-IP bucket
const RATE: Map<string, { ts: number; count: number }> = new Map();
function getBucket(ip: string) {
  let b = RATE.get(ip);
  if (!b) {
    b = { ts: Date.now(), count: 0 };
    RATE.set(ip, b);
  }
  return b;
}
