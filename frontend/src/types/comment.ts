import { User } from './user'
import { Issue } from './issue'

export interface Comment {
  id: number
  data: {
    body: {
      text: string | null
      html: string | null
      markdown: string | null
    }
  }
  meta: {
    created_at: Date
    updated_at: Date
  }
  user: User
  issue: Issue
}

export default Comment
