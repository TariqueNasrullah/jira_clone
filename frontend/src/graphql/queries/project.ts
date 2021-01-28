import gql from 'graphql-tag'

export const getProjectWithUsersAndIssues = gql`
  {
    getProjectWithUsersAndIssues {
      id
      name
      url
      description
      category
      createdAt
      updatedAt
      users {
        id
        name
        avatarUrl
        projectId
      }
      issues {
        id
        title
        description
        type
        status
        priority
        listPosition
        createdAt
        updatedAt
        userIds
      }
    }
  }
`

export const updateProject = gql`
  mutation updateProject($project: ProjectInput!) {
    updateProject(project: $project) {
      id
    }
  }
`

export const getProjectWithUsersAndIssuesMain = gql`
  query MyQuery {
    project(_id: "255c7c58-2ec2-4f6d-9909-9bbde8328981") {
      issues {
        id
        data {
          title
          description {
            text
          }
          type
          status
          priority
          list_position
        }
        meta {
          created_at
          updated_at
        }
        users {
          id
          data {
            first_name
            avatar {
              url
            }
          }
          project {
            id
          }
        }
      }
      id
      meta {
        created_at
        updated_at
      }
      users {
        id
        data {
          first_name
          avatar {
            url
          }
        }
        project {
          id
        }
      }
      data {
        name
        url
        description {
          text
        }
        category
      }
    }
  }
`
