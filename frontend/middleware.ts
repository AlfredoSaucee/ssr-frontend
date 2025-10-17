import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skydda alla /dokument-sidor
  if (pathname.startsWith("/dokument")) {
  
    const sessionCookie = req.cookies.get("authjs.session-token")?.value;

    if (!sessionCookie) {
      const originalUrl = req.nextUrl.pathname + req.nextUrl.search; 
      console.log("org:", originalUrl)
      
      return NextResponse.redirect(
        new URL(`/signin?callbackUrl=${encodeURIComponent(originalUrl)}`, req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dokument", "/dokument/:path*"],
};
