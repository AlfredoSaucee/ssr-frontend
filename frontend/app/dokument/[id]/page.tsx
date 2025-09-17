import React from 'react'
import Tiptap from '@/components/menubar/wysiwyg';
import DisplayDocument from '@/components/display-document';

export default async function Dokument({ params }: { params: { id: string } }) {
  const {id} = await params
  // fetch the document by id from backend
  const data = await fetch(`http://localhost:5025/document/${id}`,
    { cache: 'no-store' }
  )
  const post = await data.json()
  

  return (
    <DisplayDocument 
      id={id} 
      title={post.title} 
      content={post.content} 
    />
    
  )
}
