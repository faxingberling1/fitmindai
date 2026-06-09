import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // Disable the credential screen redirect and allow all access
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
