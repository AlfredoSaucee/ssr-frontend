'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { TextStyle } from '@tiptap/extension-text-style'
import FontSize from '@tiptap/extension-font-size'
const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, FontSize],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
    
  })

  

  if (!editor) {
    return null
  }

 const buttons = [
  {
    icon: "/bold-svgrepo-com.svg",
    command: () => editor.chain().focus().toggleBold().run(),
    isActive: () => editor.isActive('bold'),
    tooltip: "Bold (Ctrl + B)",
    alt: "Bold"
  },
  {
    icon: "/underline-svgrepo-com.svg",
    command: () => editor.chain().focus().toggleUnderline().run(),
    isActive: () => editor.isActive('underline'),
    tooltip: "Underline (Ctrl + U)",
    alt: "Underline"
  },
  {
    icon: "/italic-svgrepo-com.svg",
    command: () => editor.chain().focus().toggleItalic().run(),
    isActive: () => editor.isActive('italic'),
    tooltip: "Italic (Ctrl + I)",
    alt: "Italic"
  },
  
  // Lägg till fler knappar här!
];

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-[#FAF9F6] p-2 flex gap-2 border-b border-gray-300'>
        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.command}
            className={` w-[20px] text-white ${button.isActive() ? 'is-active' : ''}`}
            title={button.tooltip}
          >
            <img src={button.icon} alt={button.alt} width={20} height={20} />
          </button>
        ))}
      <select
        onChange={e => editor.chain().focus().setFontSize(e.target.value).run()}
        value={
          editor.getAttributes('textStyle').fontSize
            ? editor.getAttributes('textStyle').fontSize
            : '16px'
        }
      >
        <option value="12px">12</option>
        <option value="16px">16</option>
        <option value="20px">20</option>
        <option value="24px">24</option>
      </select>

      </div>
      <div className='w-full border border-gray-300 rounded h-screen'>
        <EditorContent editor={editor} />
      </div>
    </div>)
}

export default Tiptap