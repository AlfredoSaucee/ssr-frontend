'use client'

import { useState } from 'react'
import Tiptap from '@/components/menubar/wysiwyg'


export default function NewDocument({ onDocumentCreated }: { onDocumentCreated?: () => void }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    
    

    try {
      if(!title.trim() || !content.trim()){
        setError("Title & content cannot be empty")
        setLoading(false)
        return;
      }

      console.log("Submitting", {title, content})
      const response = await fetch('http://localhost:5025/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // om du använder sessions/cookies
        body: JSON.stringify({
          query: `
            mutation CreateDocument($title: String!, $content: String!) {
              createDocument(title: $title, content: $content) {
                id
                title
                content
              }
            }
          `,
          variables: { title, content },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(`Network error: ${response.status}`)
      }

      // Säker hantering av errors från GraphQL
      if (data.errors && Array.isArray(data.errors)) {
        throw new Error(data.errors.map((e: any) => e.message).join(', '))
      } else if (data.errors) {
        throw new Error(data.errors.message || 'Unknown error from server')
      }

      console.log('Created document:', data.data.createDocument)

      // Reset fälten
      setTitle('')
      setContent('')
      onDocumentCreated?.()
    } catch (err: any) {
      console.error('Failed to save document', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col">
      {/* <Sidebar /> */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-auto mb-4">
          <Tiptap
            content={content}
            title={title}
            setContent={setContent}
            setTitle={setTitle}
            onSave={handleSubmit}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {loading && <p>Laddar...</p>}
      </div>
    </div>
  )
}
