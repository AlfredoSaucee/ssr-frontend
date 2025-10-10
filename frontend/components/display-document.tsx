'use client'

import { useState, useEffect } from 'react'
import Tiptap from '@/components/menubar/wysiwyg'
import { io, Socket } from 'socket.io-client'
import { debounce } from 'lodash'

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
  const [socket, setSocket] = useState<Socket | null>(null)
  const [remoteCursors, setRemoteCursors] = useState<{ [userId: string]: { from: number, to: number, color: string, name: string } }>({})


  // Initiera Socket.IO
  useEffect(() => {
    const socketClient = io('http://localhost:5025')
    setSocket(socketClient)

    socketClient.on('connect', () => {
      console.log('Ansluten till Socket.IO:', socketClient.id)
      socketClient.emit('join', { documentId: id })
    })

    // Lyssna på uppdateringar från andra klienter
    socketClient.on('message', (data: any) => {
      if (data.content) {
        setContent(data.content)
      }
    })

    socketClient.on('disconnect', () => {
      console.log('Socket.IO anslutning stängd')
    })

    return () => {
      socketClient.disconnect()
    }
  }, [id])

  // Skicka live-uppdateringar till andra klienter med debounce (300ms)
  useEffect(() => {
    const sendUpdate = debounce(() => {
      if (socket && socket.connected) {
        socket.emit('message', { documentId: id, content })
      }
    }, 300)

    sendUpdate()
    return () => sendUpdate.cancel()
  }, [content, id, socket])

  // Autosave 10 sekunder efter senaste ändringen
  useEffect(() => {
    const autoSave = debounce(async () => {
      try {
        const response = await fetch(
          `https://bth-backendapi-ezdbd8cvbjfuapb3.northeurope-01.azurewebsites.net/document/${id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
          }
        )
        if (response.ok) {
          const data = await response.json()
          console.log('Document auto-saved:', data._id)
        } else {
          console.error('Auto-save failed')
        }
      } catch (err) {
        console.error('Auto-save error:', err)
      }
    }, 10000) // 10 sekunder

    autoSave()
    return () => autoSave.cancel()
  }, [content, title, id])

  return (
    <div className="flex h-[calc(100vh-100px)]">
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-hidden mb-4">
          <Tiptap
            content={content}
            title={title}
            setContent={setContent}
            setTitle={setTitle} // Behåll om du vill kunna ändra titel
          />
        </div>
      </div>
    </div>
  )
}
