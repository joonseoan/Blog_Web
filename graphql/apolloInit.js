// import React from 'react';
// import App, { Container } from 'next/app';
import { ApolloClient } from 'apollo-client';
// import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import withApollo from 'next-with-apollo';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
// import { getCookieFromReq } from '../helpers/utils';


let apolloClient = null;

// function create(initialState) {
//     const isBrowser = typeof window !== 'undefined';
//     return new ApolloClient({
//         connectToDevTools: isBrowser,
//         ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
//         link: new HttpLink({
//         uri: isBrowser ? 'http://localhost:4000' : 'http://backend:4000', // Server URL (must be absolute)
//         credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
//         // Use fetch() polyfill on the server
//         fetch: !isBrowser && fetch,
//         }),
//     })
// }
function create(initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const isBrowser = typeof window !== 'undefined'
  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: isBrowser ? 'http://localhost:3000/graphql' : '/graphql', // Server URL (must be absolute)
      credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
})
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}










// Stylings
// import 'bootstrap/dist/css/bootstrap.min.css';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// [ IMPORTANT ] : It is a way to deviate the controll css lib.
// now scss overriding bootstrap!!!
//  We can change the order
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import '../styles/main.scss';
// import auth0Client from '../services/auth0';

// const httpLink = new createHttpLink({
//       fetch,
//       uri: 'http://localhost:3000/graphql',
//       opts: {
//       credentials: "includes" // Additional fetch() options like `credentials` or `headers`
//     }
//       // credentials: 'include'
// });

// const authLink = setContext((_, { headers }) => {
//     // It is also possible to use the local storage method in here.
//     const token = Cookies.getJSON('jwt');
//     console.log('token =========?', token) 
//     // const data = cache.readQuery({
//     //   query: token
//     // });

//     // console.log(data)

//     return {
//       headers: {
//         ...headers,
//         "authorization": token ? `Bearer ${token}` : "",
//         // 'Access-Control-Allow-Origin': 'http://localhost:3000/'
//       }
//     }
//   });

// export default withApollo(
//   ({ initialState}) => 
//     new ApolloClient({
//       connectToDevTools: process.browser,
//       ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
//       link: authLink.concat(httpLink),
//       cache: new InMemoryCache().restore(initialState || {})
//     })
// )