import React from 'react';
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'; 
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { graphql } from 'react-apollo';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { getPortfolios } from '../actions/';
import { savePortfolio } from '../redux/reduxActions/';
import { Router } from '../routes';
import deletePortfolio from '../graphql/mutations/portpolioDelete';

class Portfolios extends React.Component {
  static async getInitialProps() {
    try {
      const data = await getPortfolios();
      return { ...data };
    } catch(e) {
      throw new Error(e)
    }
  }

  handleRenderPortfolio = portfolio => {
    const runRedirect = () => Router.pushRoute(`/portfolio/${ portfolio._id }`); 
    this.props.savePortfolio(portfolio, runRedirect);
  }

  handleDeletePortfolio = async _id => {
    // console.log(_id)
    try {
      const deleteMessage = await this.props.mutate({ variables: { _id } });

      if(!deleteMessage) {
        throw new Error('Unable to delete the portfolio.')
      }

    } catch(e) {
      throw new Error(e);
    }
  }

  renderPosts = () => {
    const { portfolios } = this.props.data;
    return portfolios.map((portfolio, index) => {
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
    
    if(!this.props.data) {
      return <div />
    }

    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage className="portfolio-page" title="Portfolios">
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

//  [ IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
// must use withRouter to use "connect" of Redux
export default withRouter(
  connect(null, { savePortfolio })(
    graphql(deletePortfolio)(Portfolios)
  )
) 

// export default Portfolios;
// export default graphql(fetchPortfolios)(
//   connect(null, {savePortfolio})(Portfolios)
// )
