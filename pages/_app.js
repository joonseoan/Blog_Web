import React from 'react';
import App, { Container } from 'next/app';

// Stylings
import 'bootstrap/dist/css/bootstrap.min.css';

// [ IMPORTANT ] : It is a way to deviate the controll css lib.
// now scss overriding bootstrap!!!
//  We can change the order
import '../styles/main.scss';

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
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {

    // this.props
    const { Component, pageProps } = this.props
    // enclosing current page's props
    console.log(pageProps)

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}
