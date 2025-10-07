'use client'

import { useState, useEffect, useRef } from 'react'
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
  const wsRef = useRef<WebSocket | null>(null)

  // WebSocket för realtidsuppdatering
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:5025')
    wsRef.current = ws

    ws.onopen = () => {
      // Gå med i dokument-rummet direkt
      ws.send(JSON.stringify({ type: 'join', documentId: id, content }))
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.content) {
        setContent(data.content)
      }
    }

    return () => ws.close()
  }, [id])

  const handleSubmit = async () => {
    const response = await fetch(`https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    if (response.ok) {
      const data = await response.json()
      console.log('Document saved with ID:', data._id)

      // Skicka uppdateringen via den befintliga WebSocket
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'update', documentId: id, content }))
      }
    } else {
      console.error('Failed to save document')
    }
  }

  return (
    <div className="flex h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col p-4">
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
