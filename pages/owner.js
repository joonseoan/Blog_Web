// This page is only for owner of auth0's role.

import React, { Component } from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';

import withAuth from '../components/hoc/withAuth';


class Owner extends Component {
    render() {
        return(
            <BaseLayout { ...this.props.auth }>
                <BasePage>
                    <h1>I am Owner of this page.</h1>
                </BasePage>
            </BaseLayout>
        );
    }
}

// the second argument is an second argument is which is role
//  in the parent component which is "withAuth"
export default withAuth('app owner')(Owner);