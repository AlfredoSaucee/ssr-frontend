import React from 'react'
import SidebarItems from './sidebar-list'


const navbar = () => {
  return (
    <aside className='h-screen w-64 top-0 bg-blue-400 px-8'>
      <SidebarItems />
    </aside>
  )
}

export default navbar