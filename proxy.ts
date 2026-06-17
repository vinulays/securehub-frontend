import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ROUTES } from "./constants/routes";

export function proxy(request: NextRequest) {
  const accessToken = request.cookies.get("access_token");
  const refreshToken = request.cookies.get("refresh_token");

  const hasSession = accessToken || refreshToken;

  const isLoginPage = request.nextUrl.pathname === ROUTES.AUTH.LOGIN;
  const isRootPage = request.nextUrl.pathname === ROUTES.ROOT;

  if (!hasSession && !isLoginPage) {
    return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, request.url));
  }

  if (hasSession && (isLoginPage || isRootPage)) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
