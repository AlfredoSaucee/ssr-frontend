'use client'
import { useState, useEffect } from 'react'
import SidebarItems from '@/components/sidebar-list'
import { ScrollArea } from '@/components/ui/scroll-area'
import NewDocument from '@/components/new-document'

export default function NewPage() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch(
      "https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/documents",
      { cache: "no-store" }
    )
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <div className="flex h-[calc(100vh-100px)]">
      {/* Sidebar */}
      <ScrollArea className="w-64 p-4 border-r">
        <SidebarItems posts={posts} />
      </ScrollArea>

      {/* Main content med editorn */}
      <div className="flex-1 p-4">
        <NewDocument onDocumentCreated={fetchPosts} />
      </div>
    </div>
  )
}
