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
    loggedInUser {
      phone
      id
      first_name
      email
      avatar
    }
  }
`

export const fetchMe = async (): Promise<User> => {
  try {
    const res = await apolloClient.query<{ loggedInUser: User }>({
      query: currentUser
    })
    return Promise.resolve(res.data.loggedInUser)
  } catch (error) {
    return Promise.reject(error)
  }
}
