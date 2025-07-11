import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Các route auth không cho vào nếu đã đăng nhập
const authPaths = ['/login', '/register', '/forgot-password'];

// Các route cần luồng trước đó
const protectedFlows = {
  '/verify-email': 'verify_flow',
  '/reset-password': 'reset_flow'
};

type ProtectedPath = keyof typeof protectedFlows;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('access_token')?.value;

  // 1. Nếu đang đăng nhập và vào route auth => redirect về /
  if (accessToken && (authPaths.includes(pathname) || pathname in protectedFlows)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 2. Nếu chưa đăng nhập và vào route cần luồng trước => check cookie flow
  if (!accessToken && pathname in protectedFlows) {
    const flowCookie = protectedFlows[pathname as ProtectedPath];
    const hasFlow = request.cookies.get(flowCookie)?.value;

    // Nếu không có cookie flow => redirect về /login
    if (!hasFlow) {
      const fallbackRedirects: Record<ProtectedPath, string> = {
        '/verify-email': '/login',
        '/reset-password': '/login'
      };

      const redirectTo = fallbackRedirects[pathname as ProtectedPath] ?? '/';

      return NextResponse.redirect(new URL(redirectTo, request.url));
    }
  }

  return NextResponse.next();
}
