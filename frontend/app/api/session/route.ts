import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Hämta bara cookie-headern
  const cookie = req.headers.get("cookie") || "";
  console.log("The cookie:", cookie)

  
  const resp = await fetch("http://localhost:5025/auth/session", {
    headers: { cookie },
    credentials: "include", 
  });

  const data = await resp.json();
  return NextResponse.json(data, { status: resp.status });
}




// 1. jag försöker 