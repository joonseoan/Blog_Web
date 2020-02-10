import React from 'react';
import App, { Container } from 'next/app';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
// import withApollo from 'next-with-apollo';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';
import {  withApollo } from '../graphql/withApolloClient';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// [ IMPORTANT ] : It is a way to deviate the controll css lib.
// now scss overriding bootstrap!!!
//  We can change the order
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../styles/main.scss';
import auth0Client from '../services/auth0';

// const httpLink = new createHttpLink({
//       // fetch,
//       uri: '/graphql',
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

// const withData = withApollo(
//   ({ initialState}) => 
//     new ApolloClient({
//       connectToDevTools: process.browser,
//       ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
//       link: authLink.concat(httpLink),
//       cache: new InMemoryCache().restore(initialState || {})
//     })
// )

const getApolloClient = () => {

  // const cache =  new InMemoryCache();
  const httpLink = new createHttpLink({
      fetch,
      uri: process.browser ? 'http://localhost:3000/graphql' : '/graphql',
      credentials: 'include'
  });

  // const httpLink = createHttpLink({
  //   fetch,
  //   uri: '/graphql',
  // });

  const authLink = setContext(async (_, { headers }) => {
    // It is also possible to use the local storage method in here.
    const token = await Cookies.getJSON('jwt');
    console.log('token =========?', token) 
    // const data = cache.readQuery({
    //   query: token
    // });

    // console.log(data)

    return {
      headers: {
        ...headers,
        "authorization": token ? `Bearer ${token}` : "",
        'Access-Control-Allow-Origin': 'http://localhost:3000/'
      }
    }
  });

  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore([] || {})
  });




  // const authLink = setContext((_, { headers }) => {
  //   const token = Cookies.getJSON('jwt');
  //   console.log('token: ===> ', token)
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : "",
  //     }
  //   }
  // });

  // return new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache
  // });


  // return new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache()
  // });

  
}

class MyApp extends App {

  // Component, router, and ctx are from "appContext" 
  /* 
    appContext {
        Component,
        router : ServerRouter : {
            route
        },
        ctx: {
            err: 'textMessage'
            req: {},
            res: {},
        }
    }            
  */
  
  static async getInitialProps({ Component, router, ctx }) {
    
    // try {

      let pageProps = {};
    
      // to work with browser's memory
      // only when process.browser is available => clientAuth()

      let user;
    
      if(process.browser) {
        console.log('client - auth')
        user = await auth0Client.clientAuth();
        // client = getApolloClient();
      } else {
        console.log('server - auth')
        user = await auth0Client.serverAuth(ctx.req);
        if(ctx.req.headers.cookie) {
          // client = getApolloClient(ctx.req);
        }
      }
        
      // !!user means that 
      // let isAuthenticated = false;
      
      // if(!user) {
      //   throw new Error('Unable to the current user.')
      // }

      // default: when user is not avialble : false
      // then back to true when the user is avaialble
      // https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
      const auth = { user, isAuthenticated: !!user };
      // console.log('auth: ========>', auth)
      
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
      return { pageProps, auth };
  }

  render() {

    // console.log('this.props ===================> ', this.props)
    // this.props
    const { Component, pageProps, auth } = this.props
    // enclosing current page's props
    return (
        // {/* <Container> */}
          // <ApolloProvider client={ apolloClient }>
              <Component { ...pageProps } auth={ auth } />
          // </ApolloProvider>
        // {/* </Container> */}
    );
  }
}
// export default MyApp;
export default withApollo(MyApp);