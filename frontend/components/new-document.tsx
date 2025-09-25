'use client'
import { useState } from 'react'
import Tiptap from '@/components/menubar/wysiwyg'
import Sidebar from './sidebar'

export default function NewDocument({ onDocumentCreated }: { onDocumentCreated?: () => void }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handleSubmit = async () => {
    const response = await fetch('https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    if (response.ok) {
      const data = await response.json()
      setTitle('')
      setContent('')
      onDocumentCreated?.() 
    } else {
      console.error('Failed to save document')
    }
  }

return (
  <div className="flex h-[calc(100vh-100px)]">
   
    <div className="w-64 border-r p-4">
      <Sidebar />
    </div>

   
    <div className="flex-1 flex flex-col p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <div className="flex-1 overflow-auto mb-4">
        <Tiptap content={content} setContent={setContent} />
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded w"
      >
        Spara dokument
      </button>
    </div>
  </div>
)

