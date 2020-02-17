import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { setContext } from 'apollo-link-context';
import fetch from 'isomorphic-unfetch';

export default token => {
    const link = createHttpLink({
        uri: 'http://localhost:3000/graphql',
        credentials: 'include'
    });

    if(token) {
        const authLink = setContext((_, { headers }) => {        
            return {
                headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : "",
                }
            }
        });

        return new ApolloClient({
            fetch,
            link: authLink.concat(link),
            cache: new InMemoryCache()
        });

    } else {

        return new ApolloClient({
            fetch,
            link,
            cache: new InMemoryCache()
        });
    }
}