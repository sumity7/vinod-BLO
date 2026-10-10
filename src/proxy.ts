import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["hi", "en"];

function preferredLocale(request: NextRequest) {
  const first = (request.headers.get("accept-language") ?? "").split(",")[0]?.trim().toLowerCase() ?? "";
  return first.startsWith("en") ? "en" : "hi";
}

/** Bare paths gain a language prefix, keeping the rest of the path (so /about -> /hi/about). */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and anything with a file extension.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
