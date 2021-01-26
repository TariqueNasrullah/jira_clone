import gql from 'graphql-tag'
import { apolloClient } from '../client'
import { User } from '@/types/user'

export const userLogin = gql`
  query UserLogin {
  userLogin(email: "tokyo@jira.guest", secret: "pass") {
    id_token
    refresh_token
  }
}
`

export const currentUser = gql`
  query currentUser {
    currentUser {
      id
      name
      avatarUrl
    }
  }
`

export const fetchMe = async (): Promise<User> => {
  try {
    const res = await apolloClient.query<{ currentUser: User }>({
      query: currentUser
    })
    return Promise.resolve(res.data.currentUser)
  } catch (error) {
    return Promise.reject(error)
  }
}
