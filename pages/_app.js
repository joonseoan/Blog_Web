import React from 'react';
import App, { Container } from 'next/app';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { HttpLink, createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'isomorphic-unfetch';
import Cookies from 'js-cookie';
import { getCookieFromReq } from '../helpers/utils';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// [ IMPORTANT ] : It is a way to deviate the controll css lib.
// now scss overriding bootstrap!!!
//  We can change the order
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../styles/main.scss';
import auth0Client from '../services/auth0';

const getApolloClient = () => {

  const httpLink = createHttpLink({
    fetch,
    uri: '/graphql',
  });

  const authLink = setContext((_, { headers }) => {
    const token = Cookies.getJSON('jwt');
    console.log('token: ============================>', token)
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${ token }` : '',
      }
    }
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
}

export default class MyApp extends App {

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
    // this.props
    const { Component, pageProps, auth } = this.props
    // enclosing current page's props
    return (
        <Container>
          <ApolloProvider client={ getApolloClient() }>
              <Component { ...pageProps } auth={ auth } />
          </ApolloProvider>
        </Container>
    );
  }
}