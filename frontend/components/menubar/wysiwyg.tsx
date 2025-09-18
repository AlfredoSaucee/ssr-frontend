'use client'

import { useEditor, EditorContent, isActive } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Menubar from './menubar'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Code from '@tiptap/extension-code'
import { useState } from 'react'
import { Button } from '../ui/button'


interface TiptapProps {
  content: string,
  title?: string,
  setContent: (content: string) => void,
  setTitle?: (title: string) => void,
  onSave?: () => void,
}
const Tiptap = ({ content, title, setContent, setTitle, onSave }: TiptapProps) => {

  
  
  // console.log("Document content state:", documentContent);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc ml-3',
          },
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Highlight.configure({
        HTMLAttributes: {
          class: 'bg-yellow-200 rounded px-1',
        },

      }),
      Code.configure({
        HTMLAttributes: {
        class: 'bg-gray-100 rounded px-1 font-mono',
    },
  })
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    
    editable: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-screen bg-white p-4 border border-gray-300 rounded w-[60%] mx-auto',
        
      },
    },
  })

  if (!editor) {
    return null
  }




  return (
    <div className="flex flex-col gap-2 w-[80%] mx-auto">
      {/* Top bar: menubar + title/knapp */}
      <div className="flex flex-col sm:flex-row justify-evenly items-start sm:items-center w-full sm:w-[60%] mx-auto gap-2">
        <Menubar editor={editor} />

        {setTitle && onSave && (
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Titel..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded w-full sm:w-48"
            />
            <Button className="bg-blue-500 text-white px-4 py-2 rounded sm:w-auto" onClick={onSave}>
              Spara
            </Button>
          </div>
        )}
      </div>


      {/* EditorContent måste ligga **utanför** top-bar */}
      <EditorContent editor={editor} />
    </div>

)

}

export default Tiptap