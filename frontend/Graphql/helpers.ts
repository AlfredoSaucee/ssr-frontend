export async function graphqlRequest(query: string, variables?: any) {
  const res = await fetch('http://localhost:5025/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) throw new Error(data.errors[0]?.message);
  return data.data;
}
