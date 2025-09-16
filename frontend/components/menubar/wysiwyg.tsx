'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Menubar from './menubar'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Code from '@tiptap/extension-code'


interface TiptapProps {
  post: string
  // setPost: (content: string) => void
}
const Tiptap = ({ post }: TiptapProps) => {

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
    content: post,
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
    <div className='flex flex-col '>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
    )
}

export default Tiptap