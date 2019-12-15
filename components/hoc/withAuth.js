import React, { Component } from 'react';

import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';
// This page has an argument, "Component"
//  which is a page that are being rendered here from router

// [ IMPORTANT ]
// Just think about a component in React that encoloses "children"

// Function Promise 
export default ChildComponent => {

    // At the function, it returns React function / class.
    // Then invoke returning function (which is React )again 
    return class withAuth extends Component {
        
        // [ IMPORTANT !!!!!!!!!!!!!!!! ]
        // The high order component must have getInitialProps function
        // if the child component is required to specify getInitialProps!!!!!

        static async getInitialProps(arg) {
            // Define' child component's getInitialProps
            const pageProps = ChildComponent.getInitialProps &&
                await ChildComponent.getInitialProps(arg);
            return { pageProps };
        }

        // [ IMPORTANT ]
        // The high order page should have the control function!!!
        // alertMessage() {
        //     alert('SOME MESSAGE');
        // }
        
        renderProtectedPage = () => {
            
            const { isAuthenticated } = this.props.auth;
            console.log('this.props.auth in renderProtectedPage: ', this.props)
            if(isAuthenticated) {
                return  <ChildComponent { ...this.props } />
            } else {
                return  (
                    <BaseLayout { ...this.props.auth }>
                        <BasePage>
                        <h1> You are not authorized</h1>
                        </BasePage>
                    </BaseLayout>
                );
            }
        }

        render() {
            // [ IMPORTANT ]
            // The default props always have the value that the child component have
            // if it has the props from "_app.js"!!!
            console.log('props in high order component', this.props);

            // Also, over here it can send the separate props value to the child component
            // const someVariable1 = '1';
            // const someVariable2 = '2';

            // return <ChildComponent 
            //     { ...this.props }
            //     alertMessage = { this.alertMessage }
            //     someVariable1 = { someVariable1 }
            //     someVariable2 = { someVariable2 }
            // />;

            return this.renderProtectedPage();
        }
    }
}