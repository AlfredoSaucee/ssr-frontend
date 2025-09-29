import React from 'react'

import DisplayDocument from '@/components/display-document';
import Sidebar from '@/components/sidebar';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import SidebarItems from '@/components/sidebar-list';

export default async function Dokument({ params }: { params: { id: string } }) {
  const { id } = params;

  // Gör båda anropen samtidigt
  const [docRes, listRes] = await Promise.all([
    fetch(`https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/${id}`, {
      next: { revalidate: 5 },
    }),
    fetch(`https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/documents`, {
      next: { revalidate: 5 },
    }),
  ]);

  const post = await docRes.json();   // enskilt dokument
  const posts = await listRes.json(); // array av dokument

  return (
    <div className=" overflow-hidden flex h-[calc(100vh-100px)] ">
      {/* Sidomenyn */}
      <div className="w-64 p-4 border-r">
        <SidebarItems posts={posts} />
      </div>

      {/* Dokument-visning */}
      <div className='flex-1 p-4'>
        <DisplayDocument 
          id={id}
          title={post.title}
          content={post.content}
        />
      </div>
    </div>
  );
}

