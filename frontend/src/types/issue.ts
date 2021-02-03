import { User } from './user'

export enum IssueType {
  TASK = 'task',
  BUG = 'bug',
  STORY = 'story'
}

export enum IssueStatus {
  BACKLOG = 'backlog',
  SELECTED = 'selected',
  INPROGRESS = 'inprogress',
  DONE = 'done'
}

export enum IssuePriority {
  HIGHEST = 'highest',
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  LOWEST = 'lowest'
}

export interface Issue {
  id: string
  data: {
    title: string
    type: IssueType
    status: IssueStatus
    priority: IssuePriority
    list_position: number
    description: {
      text: string | null
      markdown: string | null
      html: string | null
    }
    estimate: number | null
    time_spent: number | null
    time_remaining: number | null
  }
  meta: {
    created_at: Date
    updated_at: Date
  }
  reporter_user: {
    id: string
  }
  users: User[]
  comments: Comment[]
  project: {
    id: string
  }
}

export interface IssueCreateDTO {
  type: IssueType
  title: string
  description: string | null
  reporterId: string
  userIds: string[]
  priority: IssuePriority
  status?: IssueStatus
  projectId?: number | string
  users?: Partial<User>[]
}

export const IssueStatusCopy = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.SELECTED]: 'Selected for development',
  [IssueStatus.INPROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done'
}
export const IssuePriorityCopy = {
  [IssuePriority.HIGH]: 'High',
  [IssuePriority.HIGHEST]: 'Highest',
  [IssuePriority.MEDIUM]: 'Medium',
  [IssuePriority.LOW]: 'Low',
  [IssuePriority.LOWEST]: 'Lowest'
}

export const IssueTypeCopy = {
  [IssueType.TASK]: 'Task',
  [IssueType.BUG]: 'Bug',
  [IssueType.STORY]: 'Story'
}

export default Issue
