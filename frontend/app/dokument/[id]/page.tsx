import React from 'react'
import Tiptap from '@/components/menubar/wysiwyg';

export default async function Dokument({ params }: { params: { id: string } }) {
  
  // fetch the document by id from backend
  const data = await fetch(`http://localhost:5025/document/${params.id}`)
  const post = await data.json()
  

  return (
    <Tiptap content={post.content} title={post.title} />
    
  )
}
