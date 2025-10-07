"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface User {
  name: string
  email?: string
  image?: string
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/session", { credentials: "include" })
      .then(async (res) => {
        const data = await res.json().catch(() => null)
        console.log("session response:", res.status, data)
        setUser(data?.user || null)
        setLoading(false)
      })
      .catch(err => {
        console.error("fetch /api/session failed:", err)
        setUser(null)
        setLoading(false)
      })
  }, [])



  console.log("user:",user)

  if (loading) return (
    <div className="bg-slate-800 w-full h-[90px] flex items-center px-8">
      <span className="text-white font-bold">Laddar...</span>
    </div>
  )

  return (
    <div className="bg-slate-800 w-full h-[90px] flex justify-between items-center px-8">
      <Link href="/">
        <Image src="noetly.svg" width={80} height={80} alt="logga" className="pt-5"></Image>
      </Link>

      <Link href="/dokument">
        <p>Dina dokument</p>
      </Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <div className="w-[24px] h-[24px] overflow-hidden rounded-full">
              <img src={user.image} alt={user.name || "User avatar"} className="w-full h-full object-cover" />
            </div>

            <span className="text-white"> {user.name}</span>
            <a
              href="http://localhost:5025/auth/signout" 
              className="bg-slate-500 text-white px-4 py-1 rounded-4xl hover:bg-slate-950 transition"
            >
              Logga ut
            </a>
          </>
        ) : (
          <a
            href="http://localhost:5025/auth/signin"
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
          >
            Logga in
          </a>
        )}
      </div>
    </div>
  )
}
