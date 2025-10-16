'use client'

import Tiptap from '@/components/menubar/wysiwyg'
import Editor from '@monaco-editor/react'
import { useDocument } from '@/hooks/useDocument'
import type { Comment } from '@/types/comment'


interface DisplayDocumentProps {
  id: string
  title: string
  content: string
  comments?: Comment[]
  users: { email: string }[]
}

export default function DisplayDocument({ id, title: initialTitle, content: initialContent, comments: initialComments = [], users }: DisplayDocumentProps) {
  const {
    title, setTitle,
    content, setContent,
    comments, addComment,
    saveDocument, shareDocument,
    loading, error,
    isCodeMode, toggleMode,
    running, runOutput, runCode
  } = useDocument(id, initialTitle, initialContent, initialComments);

  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-100px)] p-4">
      <div className="mb-2 flex gap-2">
        <button
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={toggleMode}
        >
          {isCodeMode ? 'Byt Till Text Mode' : 'Byt Till Code Mode'}
        </button>
        {/* Köra kod knapp- visas bara inuti code-mode */}
        {isCodeMode && (<>
          <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" onClick={saveDocument} disabled={running}>Spara</button>
          <button className="px-3 py-1 border rounded bg-green-400 hover:bg-green-500" onClick={runCode} disabled={running}>Kör</button>
        </>)}
      </div>

      <div className="flex-1 overflow-auto border rounded">
        {isCodeMode ? (
          <div className="flex flex-row h-full">
            {/* KOD-EDITOR */}
            <div className="w-1/2 border-r border-gray-300">
              <Editor
                height="100%"
                width="80%"
                defaultLanguage="javascript"
                value={content}
                onChange={(value) => setContent(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  automaticLayout: true,
                  
                }}
                theme="vs-dark"
              />
              <button className='bg-slate-400 ' onClick={runCode} disabled={running}>Kör Kod</button>
            </div>

            
            <div className="w-1/2 bg-gray-900 text-white p-4 overflow-auto font-mono">
              {runOutput || "Kör din kod för att se output..."}
            </div>
          </div>
        ) : (
          <Tiptap
            content={content}
            id={id}
            title={title}
            setContent={setContent}
            setTitle={setTitle}
            onSave={saveDocument}
            onAddComment={addComment}
            comments={comments}
            shareDocument={shareDocument}
            users={users}
          />
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loading && <p className="mt-2">Laddar...</p>}
    </div>
  )
}
