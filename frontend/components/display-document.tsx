'use client'
import { useState } from 'react'
import Tiptap from '@/components/menubar/wysiwyg'


export default function DisplayDocument({
  id,
  title: initialTitle,
  content: initialContent,
}: {
  id: string
  title: string
  content: string
}) {
  const [title, setTitle] = useState(initialTitle || '')
  const [content, setContent] = useState(initialContent || '')

  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:5025/document/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('Document created with ID:', data._id)
      
    } else {
      console.error('Failed to save document')
    }
  }

  return (
    <div className='p-4 flex flex-col gap-4 '>
      
      
      <Tiptap
        content={content}
        title={title}
        setContent={setContent}
        setTitle={setTitle}
        onSave={handleSubmit}
      />
    </div>
  )
}
