import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = url.host.toLowerCase();
  const pathname = url.pathname;

  // Simple HTTP Basic Auth for Brutus APIs
  const protectedPaths = ["/api/brutus", "/api/brutus/fs"];
  const isProtected = protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(path + "/"),
  );

  if (isProtected) {
    const expectedUser = process.env.BRUTUS_BASIC_USER || "";
    const expectedPass = process.env.BRUTUS_BASIC_PASS || "";

    if (expectedUser && expectedPass) {
      const header = request.headers.get("authorization") || "";
      const [, encoded] = header.split(" ");
      let ok = false;

      if (encoded) {
        try {
          const decoded = Buffer.from(encoded, "base64").toString("utf8");
          const [user, pass] = decoded.split(":");
          ok = user === expectedUser && pass === expectedPass;
        } catch {
          ok = false;
        }
      }

      if (!ok) {
        return new NextResponse("Authentication required.", {
          status: 401,
          headers: {
            "WWW-Authenticate": 'Basic realm="Brutus API"',
          },
        });
      }
    }
  }

  // Ensure bare domain redirects to canonical www host for SEO
  if (host === "bespokeethos.com") {
    const redirectUrl = new URL(url.toString());
    redirectUrl.host = "www.bespokeethos.com";
    return NextResponse.redirect(redirectUrl, 308);
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ["/((?!_next|assets|favicon.ico|robots.txt|sitemap.xml).*)"],
};
