export async function getSession() {
  const res = await fetch("https://bth-backend-awgwf4b9dneyhnfe.northeurope-01.azurewebsites.net/auth/session", { credentials: "include" });

  if (!res.ok) return null;

  const data = await res.json();
  console.log("data",data)

  // Om data är null eller inte har user
  if (!data || !data.user) return null;

  return data.user;
}
