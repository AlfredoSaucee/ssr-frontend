import { Mark, mergeAttributes } from '@tiptap/core'

export const CommentMark = Mark.create({
  name: 'comment',
  inclusive: true,
  addAttributes() {
    return {
      id: { default: null },
      text: { default: null },
    }
  },
  parseHTML() {
    return [{ tag: 'mark[data-comment-id]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'mark',
      mergeAttributes(HTMLAttributes, {
        class: 'comment-mark bg-yellow-200 rounded px-1',
        'data-comment-id': HTMLAttributes.id,
        'data-comment-text': HTMLAttributes.text,
      }),
      0,
    ]
  },
})
