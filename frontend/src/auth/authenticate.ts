import { userLogin, fetchMe } from '../graphql/queries/auth'
import { loginClient } from '../graphql/client'
import { storeAuthToken } from '../utils/authToken'
import store from '../store'

export const authenticate = async () => {
  try {
    const result = await loginClient.query<{ createGuestAccount: string }>({
      query: userLogin
    })

    console.log(result)

    const { createGuestAccount: authToken } = result.data
    storeAuthToken(authToken)
    store.mutations.setIsAuthenticated(true)
    const currentUser = await fetchMe()
    store.mutations.setCurrentUser(currentUser)
  } catch (error) {
    // toast.error(error);
    console.error(error)
  }
}
