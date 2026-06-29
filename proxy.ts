import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { UserRole } from './constants/roles';
import { ROUTES } from './constants/routes';
import type { KeycloakToken } from './features/auth/types/token.types';
import { decodeJwtPayload } from './lib/utils';

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token');
  const refreshToken = request.cookies.get('refresh_token');

  const hasSession = accessToken || refreshToken;

  const isLoginPage = request.nextUrl.pathname === ROUTES.AUTH.LOGIN;
  const isRootPage = request.nextUrl.pathname === ROUTES.ROOT;

  if (!hasSession && !isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  if (hasSession && (isLoginPage || isRootPage)) {
    const payload = accessToken ? decodeJwtPayload<KeycloakToken>(accessToken?.value) : null;

    const roles = payload?.realm_access.roles ?? [];

    const isAdmin = roles.includes(UserRole.ADMIN);

    if (isAdmin) {
      return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, request.url));
    }

    return NextResponse.redirect(new URL(ROUTES.WORKSPACE.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
