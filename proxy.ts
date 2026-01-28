import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/auth';

// Define protected route patterns
const DASHBOARD_ROUTES = /^\/(dashboard|boards)/;
const ADMIN_ROUTES = /^\/admin/;

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers
  });

  const { pathname } = request.nextUrl;

  // Check if accessing dashboard routes
  if (DASHBOARD_ROUTES.test(pathname)) {
    if (!session) {
      const url = new URL('/', request.url);
      url.searchParams.set('signin', 'true');
      return NextResponse.redirect(url);
    }
  }

  // Check if accessing admin routes
  if (ADMIN_ROUTES.test(pathname)) {
    if (!session) {
      return NextResponse.redirect(new URL('/?signin=true', request.url));
    }

    // Check if user has admin role
    const userRole = session.user.role as string;
    if (!['admin', 'super_admin'].includes(userRole)) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
