import { NextResponse, type NextRequest } from 'next/server';

const allowedHosts = new Set([
  'www.bespokeethos.com',
  'bespoke-ethos.vercel.app',
  'localhost:3000',
  '127.0.0.1:3000',
]);

export function proxy(request: NextRequest) {
  const res = NextResponse.next();
  const host = request.nextUrl.host;

  if (!allowedHosts.has(host)) {
    res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return res;
}

export const config = {
  matcher: [
    // Apply broadly, but skip static assets and API routes for performance
    '/((?!_next|assets|api|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
