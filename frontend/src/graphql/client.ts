import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { getStoredAuthToken } from '@/utils/authToken'

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV === 'development'
      ? 'https://api.apito.io/secured/graphql'
      : 'https://api.apito.io/secured/graphql'
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: getStoredAuthToken()
        ? `Bearer ${getStoredAuthToken()}`
        : undefined
    }
  }
})

const appLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: 'Bearer 1f4ASkmT5Z1bS46RreNE8hOk5MSdgGNl8kfx5RytXS1YNoSSGJeadI9mqLF3YeNrttmRz4PxRKcvGhgY00o3sGMrC54sbRvUPtlcDBYmsfn2d4n5kzVNsPnEeX5nco0RID4PBZCkyooQAmS1HDxPZiYJ6m6XAs'
    }
  }
})

const cache = new InMemoryCache()

export const apolloClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
  {
    link: authLink.concat(httpLink),
    cache
  }
)

export const loginClient: ApolloClient<NormalizedCacheObject> = new ApolloClient(
  {
    link: appLink.concat(httpLink),
    cache
  }
)