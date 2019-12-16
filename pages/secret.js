import React from 'react';
import { withRouter } from 'next/router';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { getSecretData } from '../actions';


// Secret Page must be placed in Page (in router)!!!

class Secret extends React.Component {

    // [ IMPORTANT ]!!!!
    // We cannot specify getInitial Props withouth the specification
    //  in the higher order component which is withAuth here.

    // It can receive the thprops only from the higher order component.!!
    static async getInitialProps (ctx) {
        try {
            const superSecretValue = 'Super Secret Value';
            
            let secretData;
            if(process.browser) {
                secretData = await getSecretData();
            } else {
                secretData = await getSecretData(ctx.req);
            }            
            
            return { superSecretValue, secretData };

        } catch (e) {
            throw new Error(e);
        }
    }

    // [ Move to the high order component ]  
    //   renderSecretPage = () => {
    //       // When we use props in lower order component,
    //       //    it does gain props
    //       const { isAuthenticated } = this.props.auth;
    //       if(isAuthenticated) {
    //           return  (
    //             <BaseLayout { ...this.props.auth }>
    //                 <BasePage>
    //                 <h1>You are authorized</h1>
    //                 </BasePage>
    //             </BaseLayout>
    //           );
    //       } else {
    //           return  (
    //             <BaseLayout { ...this.props.auth }>
    //                 <BasePage>
    //                 <h1> You are not authorized</h1>
    //                 </BasePage>
    //             </BaseLayout>
    //           );
    //       }
    //   }

    // componentDidMount = async () => {
    //     const secretData = await getSecretData();
    //     console.log('secretData: ====>', secretData)
    // }

    render() {
        // Once again props in child component,
        // props is always undefined!!!!!!
        console.log('props in lower order compo: ', this.props);

        const { pageProps } = this.props;

        return (
            // Then it must send props.auth from "high order component" to the BaseLayout
            //  to show login / logout property
            <BaseLayout { ...this.props.auth }>
                <BasePage>
                    <h1>You are authorized</h1>
                    <h2>{ pageProps.superSecretValue }</h2>
                </BasePage>
            </BaseLayout>
        );
    }
}

export default withAuth(Secret);
