export async function graphqlRequest(query: string, variables?: any) {
  const res = await fetch('https://bth-backend-awgwf4b9dneyhnfe.northeurope-01.azurewebsites.net/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0]?.message);
  return data.data;
}
