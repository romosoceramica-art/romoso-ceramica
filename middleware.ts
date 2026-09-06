import { NextRequest, NextResponse } from "next/server";

// Flip this to false when the site is back up.
const MAINTENANCE_MODE = true;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let these through no matter what, or the site can't even render
  // the maintenance page itself.
  const isAllowed =
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.(png|jpg|jpeg|svg|gif|webp|ico|css|js|woff|woff2|ttf)$/.test(pathname);

  if (MAINTENANCE_MODE && !isAllowed) {
    const url = request.nextUrl.clone();
    url.pathname = "/maintenance";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Run on every route except the ones excluded above.
export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};