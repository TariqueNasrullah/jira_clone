import gql from 'graphql-tag'

export const getIssueWithUsersAndComments = gql`
  query getIssue($id: String!) {
    issue(_id: $id) {
      id
      data {
        description {
          text
          markdown
          html
        }
        estimate
        list_position
        priority
        status
        time_remaining
        time_spent
        title
        type
      }
      reporter_user {
        id
      }
      meta {
        created_at
        updated_at
      }
      users {
        id
      }
      comments {
        id
        data {
          body {
            text
            html
            markdown
          }
        }
        issue {
          id
        }
        user {
          id
          data {
            first_name
            avatar {
              url
            }
          }
        }
        meta {
          created_at
          updated_at
        }
      }
    }
  }
`

export const getProjectIssues = gql`
  query getProjectIssues($contains: String) {
    project(_id: "255c7c58-2ec2-4f6d-9909-9bbde8328981") {
      issues(where: { title: { contains: $contains } }) {
        id
        data {
          type
          description {
            html
          }
          title
          status
          priority
          list_position
        }
        reporter_user {
          id
        }
        users {
          id
        }
      }
      meta {
        created_at
        updated_at
      }
    }
  }
`

export const createIssue = gql`
  mutation createIssue($issue: IssueCreateInput!) {
    createIssue(issue: $issue) {
      id
      title
      type
      reporterId
      status
      createdAt
      updatedAt
    }
  }
`

export const updateIssueMutation = gql`
  mutation updateIssue($issueId: Float!, $issue: IssueUpdateInput!) {
    updateIssue(id: $issueId, issue: $issue) {
      id
      title
      description
      type
      reporterId
      status
      priority
      listPosition
      createdAt
      updatedAt
      userIds
    }
  }
`

export const deleteIssue = gql`
  mutation deleteIssue($issueId: Float!) {
    deleteIssue(id: $issueId)
  }
`
