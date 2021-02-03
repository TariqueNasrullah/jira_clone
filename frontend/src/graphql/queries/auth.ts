import gql from 'graphql-tag'
import { apolloClient } from '../client'
import { User } from '@/types/user'
import CurrentUser from '@/types/currentUser'

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

export const fetchMe = async (): Promise<any> => {
  try {
    const res = await apolloClient.query<{ loggedInUser: CurrentUser }>({
      query: currentUser
    })

    const resp = res.data.loggedInUser

    const data = {
      id: resp.id,
      data: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        first_name: resp.first_name,
        email: resp.email,
        avatar: {
          url: resp.avatar
        }
      }
    }

    return Promise.resolve(data)
  } catch (error) {
    return Promise.reject(error)
  }
}
