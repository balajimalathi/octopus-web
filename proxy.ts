import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/auth';

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Protected routes
  const isDashboard = pathname.startsWith('/dashboard');
  const isAdmin = pathname.startsWith('/admin');
  const isBoards = pathname.startsWith('/boards');

  if (isDashboard || isAdmin || isBoards) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      // Redirect to login with a return URL
      const url = new URL('/', request.url);
      url.searchParams.set('signin', 'true');
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // Admin route protection
    if (isAdmin) {
      const isAdminUser = ['admin', 'super_admin'].includes(
        session.user.role || ''
      );
      if (!isAdminUser) {
        return NextResponse.redirect(
          new URL('/dashboard', request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/boards/:path*',
    '/admin/:path*',
  ],
};
