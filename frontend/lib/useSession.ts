// lib/useSession.ts
import { useEffect, useState } from "react"

export function useSession() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:5025/auth/session", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  return user
}
