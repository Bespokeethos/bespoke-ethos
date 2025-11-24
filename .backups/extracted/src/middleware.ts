import { NextResponse } from 'next/server';

const allowedHosts = new Set([
  'www.bespokeethos.com',
  'basehub-marketing-website-black-omega.vercel.app',
  'localhost:3000',
  '127.0.0.1:3000',
]);

export function middleware(req: Request) {
  const url = new URL(req.url);
  const host = url.host;
  const res = NextResponse.next();

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

