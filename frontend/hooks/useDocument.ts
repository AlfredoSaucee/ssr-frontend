import { useState, useEffect, useCallback } from "react";
import type { Comment } from "@/types/comment";
import * as DocumentService from "@/services/documentService";
import toast from "react-hot-toast";
import debounce from "lodash/debounce"; 

export const useDocument = (
  id: string,
  initialTitle: string,
  initialContent: string,
  initialComments: Comment[] = []
) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [running, setRunning]       = useState(false);
  const [runOutput, setRunOutput]   = useState<string>('');
  const [type, setType]             = useState<DocumentService.DocumentType>("doc");

  const toggleMode = () => setIsCodeMode(prev => {
      const newMode = !prev;
      setType(newMode ? "code" : "doc");
      return newMode;
  });

  const addComment = async (comment: Comment) => {
    setComments(prev => [...prev, comment]);
    try {
      const saved = await DocumentService.addCommentToDocument(id, comment);
      setComments(prev => prev.map(c => (c.id === comment.id ? saved : c)));
    } catch (err: any) {
      console.error(err);
      toast.error("Kunde inte spara kommentar: " + err.message);
    }
  };

  const saveDocument = useCallback(
    debounce(async () => {
      if (!id || !title || !content) return;
      console.log("Autosaving document...", { id, title, content });
      try {
        await toast.promise(
          DocumentService.updateDocument(id, title, content, type),
          {
            loading: "Sparar dokument...",
            success: "Dokument sparat ",
            error: "Kunde inte spara dokument ",
          }
        );
        console.log("Dokument sparat med content:", content);
      } catch (err: any) {
        console.error("Autosave-fel:", err);
      }
    }, 2000),
    [id, title, content] 
  );

  
  useEffect(() => {
    console.log("Title or content changed, triggering save...");
    saveDocument();
  }, [title, content, saveDocument]);

  const shareDocument = async (email: string) => {
    try {
      await DocumentService.shareDocument(id, email);
      toast.success(`Dokument delat med ${email}`, { duration: 2000 });
    } catch (err: any) {
      console.error(err);
      toast.error("Kunde inte dela dokument: " + err.message, { duration: 2000 });
    }
  };

  const runCode = useCallback(async () => {
      console.log("Kör kod...");
      if(!isCodeMode) return;
  
      if(!content.trim()) {
        setRunOutput("Inget att köra");
        return;
      }
  
      try {
        const content_to_base64 = btoa(content);
        const result = await DocumentService.runCode(content_to_base64);
        const new_res = atob(result.data);
        
        setRunOutput(new_res);
      } catch (err: any) {
        console.error(err);
        setRunOutput(`Körning misslyckades: ${err.message}`);
      } finally {
        setRunning(false);
      }
    }, [content, isCodeMode]);

  return {
    title, setTitle,
    content, setContent,
    comments, addComment,
    saveDocument, shareDocument,
    loading, error,
    isCodeMode, toggleMode,
    running, runOutput, runCode
  };
};
