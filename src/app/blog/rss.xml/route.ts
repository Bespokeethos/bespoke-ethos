export const runtime = "edge";

export async function GET() {
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>Bespoke Ethos Blog</title><description>RSS placeholder</description></channel></rss>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
}
