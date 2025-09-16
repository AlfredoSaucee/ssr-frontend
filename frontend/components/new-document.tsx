'use client'
import { useState } from 'react'
import Tiptap from '@/components/menubar/wysiwyg'

export default function NewDocument() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5025/document', {
      method: 'POST',
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
