import Link from "next/link";
import { cookies } from "next/headers";

interface Document {
  id: string;
  title: string;
  content: string;
}

export default async function Home() {
  const cookieHeader = cookies().toString();

  const query = `
    query {
      documents {
        id
        title
        content
      }
    }
  `;

  const res = await fetch("http://localhost:5025/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const json = await res.json();
  const documents: Document[] = json.data?.documents || [];

  return (
    <div className="h-[calc(100vh-100px)] w-full flex justify-center items-center p-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-6xl h-full">
        
        <Link
          href="/dokument"
          className="bg-linear-to-b from-slate-700 to-slate-950 shadow-md flex justify-center items-center rounded-4xl hover:bg-blue-400 transition p-4 text-center text-white hover:scale-103"
        >
          <div>
            <h3 className="font-bold text-lg ">+ Skapa nytt dokument</h3>
          </div>
        </Link>

      
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <Link
              key={doc.id}
              href={`/dokument/${doc.id}`}
              className="bg-gray-200 flex justify-center items-center rounded-4xl hover:bg-gray-300 transition p-4 text-center shadow-xl hover:scale-103"
            >
              <div>
                <h3 className="font-bold text-lg">{doc.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{doc.content}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Inga dokument ännu</p>
        )}
      </div>
    </div>
  );
}
