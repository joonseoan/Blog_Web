import React from 'react';
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'; 
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { getPortfolios } from '../actions/';
import { savePortfolios } from '../redux/reduxActions/';
import { Router } from '../routes';
import deletePortfolio from '../graphql/mutations/portpolioDelete';

class Portfolios extends React.Component {

  static getInitialProps = async () => {
    const { data: { portfolios }} = await getPortfolios();
    return { portfolios };
  }

  componentDidMount = async () => {
    const { portfolios } = this.props;
    this.props.savePortfolios(portfolios);
  }
  
  handleRenderPortfolio = portfolio => {
    Router.pushRoute(`/portfolio/${portfolio._id}`);
  }

  handleDeletePortfolio = async _id => {
    // console.log(_id)
    try {
      const deleteMessage = await this.props.mutate({ variables: { _id } });

      if(!deleteMessage) {
        throw new Error('Unable to delete the portfolio.')
      }

      // 2) By using Redux // faster
      const { data: { portfolios }} = await getPortfolios();
      this.props.savePortfolios(portfolios);

      // 1) By using Refreshing
      // Refreshing!!! -----> Not better way.
      // Lets use Redux
      // Router.pushRoute('/portfolios');

    } catch(e) {
      throw new Error(e);
    }
  }

  renderPosts = () => {
    const { refreshedPortfolio } = this.props;
    
    return refreshedPortfolio.map((portfolio, index) => {
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <div  
                style={{ border: 'solid 1px'}}>
                <CardBody>
                  <CardTitle>{ portfolio.title}</CardTitle>
                  <CardSubtitle>{ portfolio.position }</CardSubtitle>
                  <CardText>{ portfolio.description }</CardText>
                  <Button onClick={ () => this.handleRenderPortfolio(portfolio) }>Detail</Button>
                  <Button onClick={ () => this.handleDeletePortfolio(portfolio._id) }>Delete</Button>
                </CardBody>
              </div>
            </span>
          </React.Fragment>
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
    graphql(deletePortfolio)(Portfolios)
  )
)

// export default Portfolios;
// export default graphql(fetchPortfolios)(
//   connect(null, {savePortfolio})(Portfolios)
// )
