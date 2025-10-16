// app/api/signout/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const res = await fetch("http://localhost:5025/auth/signout", {
    method: "POST",
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
    credentials: "include",
  });

  const data = await res.text(); // oftast bara "OK" eller liknande
  return NextResponse.json({ success: res.ok, data });
}
