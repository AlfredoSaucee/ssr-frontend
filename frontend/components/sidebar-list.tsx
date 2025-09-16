import Link from 'next/link'
import React from 'react'

interface Props {
  posts: {
    content: string;
    title: string;
    _id?: string;
  }[];
}

const SidebarItems = ({ posts }: Props) => {
  
  return (
    <div className='rounded'>
        <h2 className=" text-black text-xl font-bold antialiased">Sparade dokument</h2>
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <Link
              className='hover:underline border-b border-gray-300 py-1 block' 
              href={"/dokument/" + post._id}>{post.title}</Link>
            </li>
          ))}
        </ul>
    </div>
  )
}
export default SidebarItems
