import { Issue } from './issue'
import { Project } from './project'

export interface User {
  id: string
  first_name: string
  email: string
  avatar: string
  createdAt: Date
  updatedAt: Date
  comments: Comment[]
  issues: Issue[]
  project: Project
  projectId: number
}

export default User
