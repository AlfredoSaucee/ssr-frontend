import Link from 'next/link'
import React from 'react'

interface Props {
  posts: {
    content: string;
    title: string;
    id: string;
  }[];
}

const SidebarItems = ({ posts }: Props) => {
  
  return (
    <div className='rounded'>
        
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link
              className='border-b border-gray-300 py-1 block hover:bg-slate-400/10 px-0.5' 
              href={"/dokument/" + post.id}>{post.title}</Link>
            </li>
          ))}
        </ul>
    </div>
  )
}
export default SidebarItems
