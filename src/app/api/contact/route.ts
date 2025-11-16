import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type Body = {
  name?: string;
  email: string;
  company?: string;
  useCase?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  consent?: string;
};

function sanitize(str: string | undefined) {
  return (str ?? "").toString().slice(0, 2000);
}

export async function POST(req: NextRequest) {
  // Simple in-memory rate limit (best-effort; resets on cold start)
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || (req as any).ip || "unknown";
  const now = Date.now();
  const bucket = getBucket(ip);
  if (bucket.count >= 10 && now - bucket.ts < 60_000) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  if (now - bucket.ts >= 60_000) {
    bucket.count = 0;
    bucket.ts = now;
  }
  bucket.count++;
  const contentType = req.headers.get("content-type")?.toLowerCase() ?? "";
  const isFormPost =
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data");

  let successRedirect: string | undefined;
  let errorRedirect: string | undefined;

  try {
    let data: Body & { captchaToken?: string };

    if (isFormPost) {
      const formData = await req.formData();
      successRedirect = formData.get("successRedirect")?.toString() || undefined;
      errorRedirect = formData.get("errorRedirect")?.toString() || undefined;
      data = {
        name: formData.get("name")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        company: formData.get("company")?.toString() || "",
        useCase: formData.get("useCase")?.toString() || "",
        budget: formData.get("budget")?.toString() || "",
        timeline: formData.get("timeline")?.toString() || "",
        message: formData.get("message")?.toString() || "",
        consent: formData.get("consent")?.toString() || "",
        captchaToken: formData.get("cf-turnstile-response")?.toString() || "",
      };
    } else {
      const json = (await req.json()) as Body & {
        captchaToken?: string;
        successRedirect?: string;
        errorRedirect?: string;
      };
      successRedirect = json.successRedirect;
      errorRedirect = json.errorRedirect;
      data = json;
    }

    // Optional: verify Cloudflare Turnstile
    const turnstileSecret = process.env.TURNSTILE_SECRET;
    const captchaToken = sanitize((data as any).captchaToken);
    if (turnstileSecret && captchaToken) {
      const verifyRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret: turnstileSecret, response: captchaToken }),
        },
      );
      const verify = (await verifyRes.json()) as { success?: boolean };
      if (!verify.success) {
        return NextResponse.json({ error: "Captcha failed" }, { status: 400 });
      }
    }

    const name = sanitize(data.name);
    const email = sanitize(data.email);
    if (!email) {
      if (isFormPost) {
        const url = new URL(errorRedirect ?? "/contact?error=1", req.url);
        return NextResponse.redirect(url, { status: 303 });
      }
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const bodyLines = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Company: ${sanitize(data.company)}`,
      `Use case: ${sanitize(data.useCase)}`,
      `Budget: ${sanitize(data.budget)}`,
      `Timeline: ${sanitize(data.timeline)}`,
      `Consent: ${sanitize(data.consent) ? "Yes" : "No"}`,
      "",
      "Message:",
      sanitize(data.message || "(no message)"),
    ];

    // Accept-and-log: write to server logs only, no external email
    const subject = `New contact form submission — ${name || email}`;
    const now = new Date().toISOString();
    // request context enrichment
    const xff = req.headers.get("x-forwarded-for") || "";
    const userAgent = req.headers.get("user-agent") || "";
    const logPayload = {
      tag: "CONTACT_FORM_SUBMISSION",
      timestamp: now,
      subject,
      name,
      email,
      company: sanitize(data.company),
      useCase: sanitize(data.useCase),
      budget: sanitize(data.budget),
      timeline: sanitize(data.timeline),
      consent: Boolean(sanitize(data.consent)),
      message: sanitize(data.message || "(no message)"),
      ip,
      userAgent,
    };
    console.info(`[CONTACT_FORM_SUBMISSION] New contact from: ${name || "(no name)"} <${email}> — ip=${ip || "unknown"}`);
    console.info(JSON.stringify(logPayload));

    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    console.info(`[CONTACT_FORM_SUBMISSION] Resend API key present: ${resendApiKey ? 'YES' : 'NO'}`);
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: "Bespoke Ethos Contact Form <contact@bespokeethos.com>",
          to: "contact@bespokeethos.com",
          replyTo: email,
          subject: `New Contact: ${name || email}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name || "(not provided)"}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Company:</strong> ${sanitize(data.company) || "(not provided)"}</p>
            <p><strong>Use Case:</strong> ${sanitize(data.useCase) || "(not provided)"}</p>
            <p><strong>Budget:</strong> ${sanitize(data.budget) || "(not provided)"}</p>
            <p><strong>Timeline:</strong> ${sanitize(data.timeline) || "(not provided)"}</p>
            <p><strong>Consent:</strong> ${sanitize(data.consent) ? "Yes" : "No"}</p>
            <hr>
            <h3>Message:</h3>
            <p>${sanitize(data.message || "(no message)").replace(/\n/g, "<br>")}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">IP: ${ip} | User Agent: ${userAgent}</p>
          `,
        });
        console.info("[CONTACT_FORM_SUBMISSION] ✅ Email sent successfully via Resend");
      } catch (emailError) {
        console.error("[CONTACT_FORM_SUBMISSION] ❌ Failed to send email via Resend:");
        console.error(emailError);
        // Don't fail the request if email fails - still log the submission
      }
    } else {
      console.warn("[CONTACT_FORM_SUBMISSION] ⚠️ RESEND_API_KEY not configured, skipping email notification");
    }

    // Persist to Airtable when credentials are present
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableId = process.env.AIRTABLE_CONTACT_TABLE_ID;
    if (airtableApiKey && airtableBaseId && airtableTableId) {
      try {
          const messageLines = [
            sanitize(data.message || "(no message)"),
            "",
            `Company: ${sanitize(data.company) || "n/a"}`,
            `Use case: ${sanitize(data.useCase) || "n/a"}`,
            `Budget: ${sanitize(data.budget) || "n/a"}`,
            `Timeline: ${sanitize(data.timeline) || "n/a"}`,
            `Consent: ${Boolean(sanitize(data.consent)) ? "yes" : "no"}`,
            `IP: ${ip}`,
            `User agent: ${userAgent}`,
          ];

          const response = await fetch(
            `https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${airtableApiKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                fields: {
                  "Full Name": name || "(not provided)",
                  "Email Address": email,
                  "Message Content": messageLines.join("\n"),
                  "Submission Date": new Date(now).toISOString().split("T")[0] ?? "",
                  Status: "New",
                },
              }),
            },
          );

          if (!response.ok) {
            const text = await response.text();
            console.error("[CONTACT_FORM_SUBMISSION] Airtable returned non-200 response:", text);
          } else {
            const airtableRecord = (await response.json()) as { id?: string };
            console.info(
              `[CONTACT_FORM_SUBMISSION] Saved to Airtable successfully${
                airtableRecord?.id ? ` (record ${airtableRecord.id})` : ""
              }`,
            );
          }
      } catch (airtableError) {
        console.error("[CONTACT_FORM_SUBMISSION] Failed to persist to Airtable:", airtableError);
      }
    } else {
      console.warn("[CONTACT_FORM_SUBMISSION] Airtable credentials missing, skipping Airtable persistence");
    }

    if (isFormPost) {
      const url = new URL(successRedirect ?? "/contact?sent=1", req.url);
      return NextResponse.redirect(url, { status: 303 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (isFormPost) {
      const url = new URL(errorRedirect ?? "/contact?error=1", req.url);
      return NextResponse.redirect(url, { status: 303 });
    }
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// Fallback handlers for non-POST
export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}
export async function OPTIONS() {
  return NextResponse.json({}, { status: 204 });
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
