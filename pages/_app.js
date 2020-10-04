import React from 'react';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import auth0Client from '../services/auth0';
import apolloClient from '../graphql/apolloClient';
import reduxStore from '../redux/reduxStore';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// [ IMPORTANT ] : It is a way to deviate the controll css lib.
// now scss overriding bootstrap!!!
//  We can change the order
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
import '../styles/main.scss';

// const store = createStore(reducers, applyMiddleware(reduxThunk));

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
      } else {
        console.log('server - auth')
        user = await auth0Client.serverAuth(ctx.req);
      }
        
      // !!user means that 
      // let isAuthenticated = false;
      
      // if(!user) {
      //   throw new Error('Unable to the current user.')
      // }
      
      // default: when user is not avialble : false
      // then back to true when the user is avaialble
      // https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
      console.log('user --> ', user)
      const auth = { user, isAuthenticated: !!user };
      // console.log('auth: ========>', auth)
      
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
      console.log('pageProps : ', pageProps)
      return { pageProps, auth };  
  }

  render() {

    // console.log('this.props ===================> ', this.props)
    // this.props
    const { Component, pageProps, auth } = this.props

    // enclosing current page's props
    return (
      <Container>
        <ApolloProvider client={ apolloClient() }>
          <Provider store={ reduxStore }>
            <Component { ...pageProps } auth={ auth } />
          </Provider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default MyApp;