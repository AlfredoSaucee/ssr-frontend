// lib/useSession.ts
import { useEffect, useState } from "react"

export function useSession() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("https://bth-backend-awgwf4b9dneyhnfe.northeurope-01.azurewebsites.net/auth/session", {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => setUser(data.user))
  }, [])

  return user
}
