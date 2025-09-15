'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { TextStyle } from '@tiptap/extension-text-style'
import FontSize from '@tiptap/extension-font-size'
import Menubar from './menubar'
import { text } from 'stream/consumers'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import Code from '@tiptap/extension-code'

const Tiptap = () => {

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
          class: 'my-custom-class',
        },

      }),
      Code.configure({
        HTMLAttributes: {
        class: 'my-custom-class',
    },
  })
    ],
    content: '',
    editable: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-screen bg-white p-4 border border-gray-300 rounded',
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