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
    console.log("Document saved:", { title, content });
    console.log("Response:", response);
    if (response.ok) {
      const data = await response.json()
      console.log('Document created with ID:', data._id)
      
    } else {
      console.error('Failed to save document')
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Tiptap content={content} setContent={setContent} />
      <button onClick={handleSubmit}>Save</button>
    </div>
  )
}
