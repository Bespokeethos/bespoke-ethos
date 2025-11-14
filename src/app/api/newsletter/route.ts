import { NextRequest, NextResponse } from "next/server";

const invalidResponse = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (typeof email !== "string" || !email.includes("@")) {
      return invalidResponse("Valid email is required");
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableTableId = process.env.AIRTABLE_NEWSLETTER_TABLE_ID;

    if (!airtableApiKey || !airtableBaseId || !airtableTableId) {
      console.error("[NEWSLETTER_SUBSCRIBE] Airtable credentials missing");
      return invalidResponse("Service temporarily unavailable", 503);
    }

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
            "Full Name": email.split("@")[0] || "Newsletter Subscriber",
            "Email Address": email,
            "Signup Date": new Date().toISOString(),
            "Lead Source": "Website",
            Status: "Subscribed",
            Notes: "Newsletter opt-in from website footer",
          },
        }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("[NEWSLETTER_SUBSCRIBE] Airtable error:", text);
      return invalidResponse("Failed to subscribe", 500);
    }

    const airtableRecord = (await response.json()) as { id?: string };
    console.info(
      `[NEWSLETTER_SUBSCRIBE] Saved to Airtable${
        airtableRecord?.id ? ` (record ${airtableRecord.id})` : ""
      }`,
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[NEWSLETTER_SUBSCRIBE] Unexpected error:", error);
    return invalidResponse("Invalid request");
  }
}

export const runtime = "edge";
