import React, { Fragment } from 'react';
import { Col, Row, Button } from 'reactstrap'; 
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import withAuth from '../components/hoc/withAuth';
import { getPortfolios } from '../actions/';
import { savePortfolios } from '../redux/reduxActions/';
import { Router } from '../routes';
import deletePortfolio from '../graphql/mutations/portpolioDelete';
import portfoliosQuery from '../graphql/queries/portfolios.queries';
import PortfolioCard from '../components/portfolios/portfolioCard/portfolioCard';

class Portfolios extends React.Component {

  static getInitialProps = async () => {
    const { data: { portfolios }} = await getPortfolios();
    return { portfolios };
  }

  componentDidMount = async () => {
    const { portfolios } = this.props;
    // redux
    this.props.savePortfolios(portfolios);
  }
  
  handleCreatePortfolio= () => {
    Router.pushRoute('/portfolionew');
  }

  handleRenderPortfolio = (portfolio, e) => {
    // [ Important!!!! ] e.stopPropagation prevents Modal or any other function arounding button
    // which means that the event scope is isolated in the button event.
    e.stopPropagation();
    Router.pushRoute(`/portfolio/${ portfolio._id }`);
  }

  // used component level grapqhql for testing.
  handleDeletePortfolio = async (_id, e) => {
    e.stopPropagation();
    try {
      // component-level graphql for testing
      const deleteMessage = await this.props.mutate({ variables: { _id } });
      
      if(!deleteMessage) {
        throw new Error('Unable to delete the portfolio.')
      }

      // 3)
      // By implementing graphql refetch
      const { data: { portfolios }} = await this.props.data.refetch();
      // Save portfolios to redux
      this.props.savePortfolios(portfolios);
      
      // 2) By using Redux // faster
      // By implemen
      // const { data: { portfolios }} = await getPortfolios();
      // this.props.savePortfolios(portfolios);

      // 1) By using Refreshing
      // Refreshing!!! -----> Not better way.
      // Lets use Redux
      // Router.pushRoute('/portfolios');

    } catch(e) {
      throw new Error(e);
    }
  }

  renderPosts = () => {
    console.log(this.props)
    // withAuth ==> pageProps!!!
    const { refreshedPortfolio } = this.props;
    const namespace = 'http://localhost:3000/role';

    return refreshedPortfolio.map((portfolio, index) => {
      return (
        <Col md="4" key={ index }>
          <PortfolioCard 
            portfolio={ portfolio }
          >
            {
              this.props.auth.isAuthenticated && this.props.auth.user[namespace] === 'app owner' &&  
              (<Fragment>
                <Button onClick={ e => this.handleRenderPortfolio(portfolio, e) }>Detail</Button>
                <Button onClick={ e => this.handleDeletePortfolio(portfolio._id, e) }>Delete</Button>
              </Fragment>)
            }
          </PortfolioCard>
        </Col>
      )
    })
  }

  render() {
    const { refreshedPortfolio } = this.props;
    
    if(!refreshedPortfolio && refreshedPortfolio.length < 1) {
      return <div />;
    }

    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage className="portfolio-page" title="YOUR PORTFOLIO LIST">
            <div 
              className="create-portfolio-btn"
              onClick={ this.handleCreatePortfolio }
            >
              Create Portfolio
            </div>
            <ul>
              <Row>
                { this.renderPosts() }
              </Row>
            </ul>
        </BasePage>
      </BaseLayout>
    )
  }
}

const mapStateToProps = ({ portfolios }) => {
  return {
    refreshedPortfolio: portfolios
  }
}  
  
//  [ IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
// must use withRouter to use "connect" of Redux
export default withRouter(
  connect(mapStateToProps, { savePortfolios })(
    graphql(deletePortfolio)(
      graphql(portfoliosQuery)(Portfolios)
    )
  )
)

// export default Portfolios;
// export default graphql(fetchPortfolios)(
//   connect(null, {savePortfolio})(Portfolios)
// )
