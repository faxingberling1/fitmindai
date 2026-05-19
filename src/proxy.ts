import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // Allow access to the custom auth route itself so we don't cause a redirect loop
  if (req.nextUrl.pathname.startsWith('/access')) {
    return NextResponse.next();
  }

  // Check for the global lock cookie set by the server action
  const authCookie = req.cookies.get('fitmind_global_lock');

  // If the cookie is missing or invalid, redirect to the custom gatekeeper
  if (!authCookie || authCookie.value !== 'unlocked') {
    const url = req.nextUrl.clone();
    url.pathname = '/access';
    return NextResponse.redirect(url);
  }

  // Otherwise, user is unlocked, let them proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files, Next.js internal)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * This ensures the auth prompt triggers on all actual pages and API routes, 
     * but internal asset fetching remains fast once authenticated.
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
