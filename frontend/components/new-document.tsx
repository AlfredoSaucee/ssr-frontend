'use client'

import Editor from '@monaco-editor/react'
import Tiptap from '@/components/menubar/wysiwyg'
import { useNewDocument } from '@/hooks/useNewDocument'


export default function NewDocument({ onDocumentCreated }: { onDocumentCreated?: () => void }) {
  const {
    title, setTitle,
    content, setContent,
    comments, handleAddComment,
    loading, error,
    isCodeMode, toggleMode,
    handleSubmit,
    shareDocumentHandler,
    running, runOutput, runCode
  } = useNewDocument(onDocumentCreated);

  


  return (
    <div className="flex flex-1 flex-col h-[calc(100vh-100px)] p-4">
      <div className="mb-2 flex gap-2">
        <button
          className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300"
          onClick={() => {
          console.log("CLICK from button");
          toggleMode();
        }}
        >
          {isCodeMode ? 'Byt Till Text Mode' : 'Byt Till Code Mode'}
        </button >
        {/* Köra kod knapp- visas bara inuti code-mode */}
        {isCodeMode && (<>
          <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" onClick={runCode} disabled={running}>Kör Kod</button>
          <button className="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300" onClick={handleSubmit} disabled={running}>Spara</button>
        </>)}
      </div>

      <div className="flex-1 overflow-auto border rounded">
        {isCodeMode ? (
          <div className="flex flex-row h-full p-8">
            {/* KOD-EDITOR */}
            <div className="w-1/2 border-r border-gray-300 ">
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
            </div>

            
            <div className="w-1/2 bg-gray-900 text-white p-4 overflow-auto font-mono">
              {runOutput || "Kör din kod för att se output..."}
            </div>
          </div>
        ) : (
          <Tiptap
            
            content={content}
            title={title}
            setContent={setContent}
            setTitle={setTitle}
            onSave={handleSubmit}
            onAddComment={handleAddComment}
            comments={comments}
            shareDocument={(email) => shareDocumentHandler(email)}
          />
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {loading && <p className="mt-2">Laddar...</p>}
    </div>
  )
}
