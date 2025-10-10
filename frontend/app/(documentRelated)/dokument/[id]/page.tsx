import React from "react";
import DisplayDocument from "@/components/display-document";
import { cookies } from "next/headers";
import { ScrollArea } from "@/components/ui/scroll-area";
import SidebarItems from "@/components/sidebar-list";

export default async function Dokument({ params }: { params: { id: string } }) {
  const { id } = await params;
  const cookieHeader = cookies().toString();

  const query = `
    query GetDocumentsAndOne($id: ID!) {
      documents {
        id
        title
        content
      }
      document(id: $id) {
        id
        title
        content
      }
    }
  `;

  try {
    const res = await fetch("http://localhost:5025/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify({ query, variables: { id } }),
      cache: "no-store",
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("GraphQL Network Error:", res.statusText);
      return <div>Fel vid hämtning av dokument ({res.status})</div>;
    }

    if (json.errors) {
      console.error("GraphQL errors:", json.errors);
      return <div className="w-full h-screen flex justify-center items-center font-bold">Serverfel: {json.errors[0]?.message || "Okänt fel"}</div>;
    }

    const posts = json.data?.documents || [];
    const post = json.data?.document;

    if (!post) {
      return <div>Dokumentet hittades inte eller du saknar behörighet.</div>;
    }

    return (
      <div className="flex h-full overflow-hidden">
        {/* Sidebar med alla dokument */}
        <ScrollArea className="w-64 p-4 border-r">
          <SidebarItems posts={posts} />
        </ScrollArea>

        {/* Dokument-visning */}
        <div className="flex-1 p-4 overflow-auto">
          <DisplayDocument
            id={post.id}
            title={post.title}
            content={post.content}
          />
        </div>
      </div>
    );
  } catch (err: any) {
    console.error("Fetch error:", err);
    return <div>Ett oväntat fel inträffade: {err.message}</div>;
  }
}
