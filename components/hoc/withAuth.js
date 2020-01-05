import React, { Component } from 'react';

import BaseLayout from '../layouts/BaseLayout';
import BasePage from '../BasePage';


const hostUrl = 'http://localhost:3000/';

// [ IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!]
// Change it into ES17
export default role => {
    return ChildComponent => {

        // At the function, it returns React function / class.
        // Then invoke returning function (which is React )again 
        return class withAuth extends Component {
            
            // [ IMPORTANT !!!!!!!!!!!!!!!! ]
            // The high order component must have getInitialProps function
            // if the child component is required to specify getInitialProps!!!!!
            static async getInitialProps(ctx) {
                // Define' child component's getInitialProps
                const pageProps = ChildComponent.getInitialProps &&
                    await ChildComponent.getInitialProps(ctx);
                return { pageProps };
            }

            // [ IMPORTANT ]
            // The high order page should have the control function!!!
            // alertMessage() {
            //     alert('SOME MESSAGE');
            // }
            renderProtectedPage = () => {

                // auth has user field
                const { isAuthenticated, user } = this.props.auth;
                const userRole = user && user[`${hostUrl}role`];
                let isAuthorized = false;

                if(role) {
                    if(userRole && userRole === role) {
                        isAuthorized = true;
                    }

                } else {
                    isAuthorized = false;
                }

                if(!isAuthenticated) {
                    return (
                        <BaseLayout { ...this.props.auth }>
                            <BasePage>
                            <h1> You are not authenticated to access to the this page</h1>
                            </BasePage>
                        </BaseLayout>
                    );
                } else if(isAuthenticated && !isAuthorized) {
                    return (
                        <BaseLayout { ...this.props.auth }>
                            <BasePage>
                            <h1> Sorry, You are authenticated but not authorized</h1>
                            </BasePage>
                        </BaseLayout>
                    );
                } else {
                    // when fully authorized and authenticated
                    return <ChildComponent { ...this.props } />;
                }
            }

            render() {
                // [ IMPORTANT ]
                // The default props always have the value that the child component have
                // if it has the props from "_app.js"!!!
                // console.log('props in high order component', this.props);

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
}

// This page has an argument, "Component"
//  which is a page that are being rendered here from router

// [ IMPORTANT ]
// Just think about a component in React that encoloses "children"

// Function Promise 
// "rolde is a second argument"
/* 
export default (ChildComponent,  role) => {

    // At the function, it returns React function / class.
    // Then invoke returning function (which is React )again 
    return class withAuth extends Component {
        
        // [ IMPORTANT !!!!!!!!!!!!!!!! ]
        // The high order component must have getInitialProps function
        // if the child component is required to specify getInitialProps!!!!!

        static async getInitialProps(ctx) {
            // Define' child component's getInitialProps
            const pageProps = ChildComponent.getInitialProps &&
                await ChildComponent.getInitialProps(ctx);
            return { pageProps };
        }

        // [ IMPORTANT ]
        // The high order page should have the control function!!!
        // alertMessage() {
        //     alert('SOME MESSAGE');
        // }
        
        renderProtectedPage = () => {

            // auth has user field
            const { isAuthenticated, user } = this.props.auth;
            const userRole = user && user[`${hostUrl}role`];
            let isAuthorized = false;

            if(role) {
                if(userRole && userRole === role) {
                    isAuthorized = true;
                }

            } else {
                isAuthorized = true;
            }

            if(!isAuthenticated) {
                return (
                    <BaseLayout { ...this.props.auth }>
                        <BasePage>
                        <h1> You are not authenticated to access to the this page</h1>
                        </BasePage>
                    </BaseLayout>
                );
            } else if(isAuthenticated && !isAuthorized) {
                return (
                    <BaseLayout { ...this.props.auth }>
                        <BasePage>
                        <h1> Sorry, You are authenticated but not authorized</h1>
                        </BasePage>
                    </BaseLayout>
                );
            } else {
                return <ChildComponent { ...this.props } />;
            }
        }

        render() {
            console.log('role: -----------> ', role) // ===> admin

            // [ IMPORTANT ]
            // The default props always have the value that the child component have
            // if it has the props from "_app.js"!!!
            // console.log('props in high order component', this.props);

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
} */