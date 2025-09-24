import React from 'react'
import SidebarItems from './sidebar-list'
import { ScrollArea } from "@/components/ui/scroll-area"

const data = await fetch("https://ssr-frontend-ccewdebqh8htccf0.northeurope-01.azurewebsites.net/document/documents")


const posts = await data.json()
console.log(posts)


const navbar = () => {
  return (
    <ScrollArea className="w-64 h-[calc(100vh-100px)] p-4">
      <SidebarItems posts={posts} />
    </ScrollArea>
  )
}

export default navbar 