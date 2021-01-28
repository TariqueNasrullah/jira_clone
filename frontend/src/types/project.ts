import { Issue } from './issue'
import { User } from './user'
export enum ProjectCategory {
  SOFTWARE = 'software',
  MARKETING = 'marketing',
  BUSINESS = 'business'
}

export interface Project {
  id: string
  data: {
    name: string
    url: string | null
    description: {
      text: string | null
    }
    category: ProjectCategory
  }
  meta: {
    create_at: Date
    updated_at: Date
  }
  issues: Issue[]
  users: User[]
}

export const ProjectCategoryCopy = {
  [ProjectCategory.SOFTWARE]: 'Software',
  [ProjectCategory.MARKETING]: 'Marketing',
  [ProjectCategory.BUSINESS]: 'Business'
}

export default Project
