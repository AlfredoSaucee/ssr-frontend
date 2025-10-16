export const GET_ALL_DOCUMENTS = `
    query GetDocumentsAndOne($id: ID!) {
      documents {
        id
        title
        content
      }
      document(id: $id) {
        id
        title
        content
        comments {
          id
          text
          from
          to
        }
      }
      users {
        email
      }
    }
  `