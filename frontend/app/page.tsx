import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const cookieStore = cookies(); 
  const token = (await cookieStore).get("authjs.session-token")?.value;

  const res = await fetch(`http://localhost:5025/auth/session`, {
    headers: {
      Cookie: `authjs.session-token=${token}`,
    },
    cache: "no-store",
  });

  const session = await res.json();

  // if (!session?.user) {
  //   // inte inloggad
  //   redirect("/signin");
  // }

  // här kan du använda session.user
  return (
    <div className="flex w-full h-[calc(100vh-90px)] items-center justify-center bg-linear-to-b from-slate-900 to-slate-950">
      {session ? (
        <div className="flex flex-col justify-center items-center text-[#E4960E]">
          <Link href="/dokument-list">
            <Button className="hover:cursor-pointer">Kom igång</Button>
          </Link>
        </div>
        
      ): (
        <div className="flex flex-col justify-center items-center text-[#E4960E] gap-4 font-orbitron">
          <h1 className="font-bold text-5xl">SSR-EDITOR</h1>
          <p>Klicka på länken nedan för att logga in med Github</p>
          <div className="flex flex-row gap-6 w-full justify-evenly">
            
            <Link href="http://localhost:5025/auth/signin">
              <Button className="hover:cursor-pointer hover:bg-[#e1a742c5] hover:scale-105 hover:rotate-2 bg-[#e39309c5] shadow-2xl shadow-[#97b6ff] text-black border border-black ">Logga in</Button>
            </Link>
          </div>
        </div>
    )}
    </div>
  );
}
