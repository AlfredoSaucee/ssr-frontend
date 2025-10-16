export async function getSession() {
  const res = await fetch("http://localhost:5025/auth/session", { credentials: "include" });

  if (!res.ok) return null;

  const data = await res.json();
  console.log("data",data)

  // Om data är null eller inte har user
  if (!data || !data.user) return null;

  return data.user;
}
