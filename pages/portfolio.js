import React from 'react';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router'
import axios from 'axios';
import withAuth from '../components/hoc/withAuth';
import { graphql } from 'react-apollo';
import fetchPortfolios from '../graphql/queries/portfolio.queries'; 

class Portfolio extends React.Component {
  static async getInitialProps({query}) {
    const portfolioId = query.id;
    let portfolio = {};

    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${portfolioId}`);
      portfolio = response.data;

    } catch(err) {
      console.error(err);
    }

    return { portfolio };
  }

  render () {
    const { portfolio, data:{ portfolios }} = this.props;
    console.log(portfolios)
    return <div>Test</div>
    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage title="Portfolios">
          <h1> {portfolio.title} </h1>
          <p> BODY: {portfolio.body} </p>
          <p> ID:  {portfolio.id} </p>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default graphql(fetchPortfolios)(
  withRouter(Portfolio)
)

// export default withAuth(Portfolio);