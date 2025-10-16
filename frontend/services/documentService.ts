import { graphqlRequest } from "@/Graphql/helpers";
import { ADD_COMMENT, UPDATE_DOCUMENT, SHARE_DOCUMENT, CREATE_DOCUMENT } from "@/Graphql/mutations";
type Comment = {
  id: String;
  text: String;
  from: Number;
  to: Number;
};
export type DocumentType = "code" | "doc";

export const addCommentToDocument = async (documentId: string, comment: Comment) => {
  const data = await graphqlRequest(ADD_COMMENT, {
    documentId,
    text: comment.text,
    from: comment.from,
    to: comment.to,
  });
  return data.addComment;
};

export const updateDocument = async (id: string, title: string, content: string, type: DocumentType) => {
  console.log("Uppdaterar dokument:", { id, title, content, type });
  return await graphqlRequest(UPDATE_DOCUMENT, { id, title, content, type });
};

export const shareDocument = async (id: string, email: string) => {
  return await graphqlRequest(SHARE_DOCUMENT, { id, email });
};


export const createDocument = async (title: string, content: string, type: DocumentType) => {
  console.log("CREATE_DOCUMENT variables (client):", { title, content, type });
  const data = await graphqlRequest(CREATE_DOCUMENT, { title, content, type });
  return data.createDocument;
};


export const runCode = async (code: string) => {
  const response = await fetch('https://execjs.emilfolino.se/code', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });
  

  if (!response.ok) {
    throw new Error(`Error running code: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};