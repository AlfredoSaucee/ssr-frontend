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
    const response = await fetch(`https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/${id}`, {
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
    <div className="flex h-[calc(100vh-100px)]">
    <div className="flex-1  flex-col p-4">
      
      <div className="flex-1 overflow-hidden mb-4">
        <Tiptap
        content={content}
        title={title}
        setContent={setContent}
        setTitle={setTitle}
        onSave={handleSubmit}
      />
      </div>
      
    </div>
  </div>
  )
}
