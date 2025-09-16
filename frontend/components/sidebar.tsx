import React from 'react'
import SidebarItems from './sidebar-list'

const data = await fetch("http://localhost:5025/documents")
const posts = await data.json()


const navbar = () => {
  return (
    <aside className='h-screen w-64 top-0 border border-r-blue-600 px-8'>
      <SidebarItems posts={posts} />
    </aside>
  )
}

export default navbar