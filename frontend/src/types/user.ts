import { Issue } from './issue'
import { Project } from './project'

export interface User {
  id: string
  data: {
    first_name: string
    email: string
    avatar: {
      url: string
    }
  }
  meta: {
    created_at: Date
    updated_at: Date
  }
  comments: Comment[]
  issues: Issue[]
  project: Project
  projectId: number
}

export default User
