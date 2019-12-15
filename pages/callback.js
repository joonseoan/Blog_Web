import React from 'react';

import Auth0Client from '../services/auth0';
// withRouter for hoc
// Wrapping component with router in prop system.
import { withRouter } from 'next/router';

// userRouter is for only redirection.
// we do not need to wrap the component.
// import { userRouter } from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

// This is a router for callback of auth0
class Auth0CallBack extends React.Component {

    // when using userRouter
    //   static getinitialProps = () => {
    //       const router = userRouter();
    //       return { router}
    //   } 

  componentDidMount = async () => {
    
    try {
        await Auth0Client.handleAuthentication();
        // from withRouter
        // from callback page to home
        this.props.router.push('/');
    } catch(e) {
        throw new Error(e);
    }  
  }

  render() {
    return (
      <BaseLayout>
        <BasePage>
            <h1>Loading.....with Login</h1>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withRouter(Auth0CallBack);