import React from 'react';
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'; 
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { getPortfolios } from '../actions/';
import { savePortfolio } from '../redux/reduxActions/';
import { Router } from '../routes';

class Portfolios extends React.Component {
  static async getInitialProps() {
    const data = await getPortfolios();
    return { ...data };
  }

  renderPortfolio = portfolio => {
    const runRedirect = () => Router.pushRoute(`/portfolio/${ portfolio._id }`); 
    this.props.savePortfolio(portfolio, runRedirect);
  }

  renderPosts = () => {
    const { portfolios } = this.props.data;
    return portfolios.map((portfolio, index) => {
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <div 
                onClick={ () => this.renderPortfolio(portfolio) } 
                style={{ border: 'solid 1px'}}>
                <CardBody>
                  <CardTitle>{ portfolio.title}</CardTitle>
                  <CardSubtitle>{ portfolio.position }</CardSubtitle>
                  <CardText>{ portfolio.description }</CardText>
                  <Button>Button</Button>
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
  connect(null, { savePortfolio })(Portfolios)
) 

// export default Portfolios;
// export default graphql(fetchPortfolios)(
//   connect(null, {savePortfolio})(Portfolios)
// )
