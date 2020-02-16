import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router'
import axios from 'axios';
import withAuth from '../components/hoc/withAuth';
import fetchPortfolio from '../graphql/queries/portfolio.queries';
import { graphql } from 'react-apollo';
import { Router } from '../routes';

class Portfolio extends React.Component {
  static async getInitialProps({ query }) {
    const portfolioId = query.id;
    return { portfolioId };
  }

  render () {
    const { portfolio } = this.props.data;
    
    if(!portfolio) {
      return <div />;
    }

    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage title="Portfolio">
          <h1> {portfolio.title} </h1>
          <p> BODY: {portfolio.position} </p>
          <p> ID:  {portfolio._id} </p>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default withAuth('app owner')(
  graphql(fetchPortfolio, {
    options: (props) => {
        return { variables: { _id: props.pageProps.portfolioId || '' }}}
  })(
    withRouter(Portfolio)
  )
);