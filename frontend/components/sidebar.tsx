'use client'
import React, { useState, useEffect } from 'react'
import SidebarItems from './sidebar-list'
import { ScrollArea } from "@/components/ui/scroll-area"


export default function Layout() {
  const [posts, setPosts] = useState([])

  const fetchPosts = async () => {
    const res = await fetch(`${process.env.MONGO_DB_URI}/document/documents`, { next: { revalidate: 5 } })
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="flex">
      <ScrollArea className="w-64 h-[calc(100vh-100px)] p-4">
        <SidebarItems posts={posts} />
      </ScrollArea>
      
    </div>
  )
}
