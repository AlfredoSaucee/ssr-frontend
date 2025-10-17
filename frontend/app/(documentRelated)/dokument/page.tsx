import SidebarItems from "@/components/sidebar-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import NewDocument from "@/components/new-document";
import { cookies } from "next/headers";

export default async function DokumentPage() {
  const cookieHeader = cookies().toString();

  const query = `
    query {
      documents {
        id
        title
        content
        comments{
          id
          text
          from
          to
        }
      }
    }
  `;

  const res = await fetch("https://bth-backend-awgwf4b9dneyhnfe.northeurope-01.azurewebsites.net/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

  const json = await res.json();
  const posts = json.data?.documents || [];

  return (
    <div className="flex flex-1 min-h-0  ">
      {/* Sidebar */}
      <ScrollArea className="w-64 p-4 border-r">
        <SidebarItems posts={posts} />
      </ScrollArea>

      {/* Main content */}
      <div className="flex-1 ">
        <NewDocument />
      </div>
    </div>
  );
}
