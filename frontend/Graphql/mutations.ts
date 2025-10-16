export const CREATE_DOCUMENT = `
  mutation CreateDocument($title: String!, $content: String!, $type: DocumentType!) {
    createDocument(title: $title, content: $content, type: $type) {
      id
      title
      content
      type
    }
  }
`;

export const SHARE_DOCUMENT = `
  mutation ShareDocument($id: ID!, $email: String!) {
    shareDocument(id: $id, email: $email) {
      id
      allowed_editors {
        id
        email
      }
    }
  }
`;


export const ADD_COMMENT = `
    mutation AddComment($documentId: ID!, $text: String!, $from: Int!, $to: Int!) {
    addComment(documentId: $documentId, text: $text, from: $from, to: $to) {
        id
        text
        from
        to
    }
    }
`;


export const UPDATE_DOCUMENT = `
    mutation UpdateDocument($id: ID!, $title: String!, $content: String!,$type: DocumentType!) {
        updateDocument(id: $id, title: $title, content: $content, type: $type) {
        id
        title
        content
        type
        }
    }
    `;



