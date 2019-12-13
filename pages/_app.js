import React from 'react';
import App, { Container } from 'next/app';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';

// [ IMPORTANT ] : It is a way to deviate the controll css lib.
// now scss overriding bootstrap!!!
//  We can change the order
import '../styles/main.scss';

import auth0Client from '../services/auth0';

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
    
    let pageProps = {};
    
    // to work with browser's memory
    // only when process.browser is available => clientAuth()
    const user = process.browser ? auth0Client.clientAuth() : auth0Client.serverAuth(ctx.req); 
    
    
    console.log('user in _app.js : ', user);

    // !!user means that 
    // let isAuthenticated = false;
    
    // if(user) {
    //   isAuthenticated = true;
    // }

    // default: when user is not avialble : false
    // then back to true when the user is avaialble
    // https://medium.com/better-programming/javascript-bang-bang-i-shot-you-down-use-of-double-bangs-in-javascript-7c9d94446054
    const auth = { user, isAuthenticated: !!user };
    
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps, auth };

  }

  render () {

    // this.props
    const { Component, pageProps, auth } = this.props
    // enclosing current page's props
    console.log('pageProps: ', pageProps)
    // debugger

    return (
      <Container>
        <Component { ...pageProps } auth={ auth } />
      </Container>
    );

  }
}
