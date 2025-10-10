import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skydda alla /dokument-sidor
  if (pathname.startsWith("/dokument")) {
    // Kolla om auth.js-session-token finns
    //Finns den är vi inloggade
    const sessionCookie = req.cookies.get("authjs.session-token")?.value;

    if (!sessionCookie) {
      // Ingen session → redirect till login
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dokument", "/dokument/:path*"],
};
