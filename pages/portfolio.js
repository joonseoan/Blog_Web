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

  componentDidMount = () => {
    console.log('lllllllllllllllll', this.props.pageProps.portfolioId);
  }

  render () {
    // const { portfolio } = this.props;
    console.log('this.props: ', this.props)
    return(
      <div>Testing</div>
    )
    // return (
    //   <BaseLayout { ...this.props.auth }>
    //     <BasePage title="Portfolios">
    //       <h1> {portfolio.title} </h1>
    //       <p> BODY: {portfolio.body} </p>
    //       <p> ID:  {portfolio.id} </p>
    //     </BasePage>
    //   </BaseLayout>
    // )
  }
}

export default withAuth('app owner')(
  graphql(fetchPortfolio)(
    withRouter(Portfolio)
  )
);