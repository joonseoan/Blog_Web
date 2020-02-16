import React from 'react';
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'; 
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Link } from '../routes';
import { graphql } from 'react-apollo';
import fetchPortfolios from '../graphql/queries/portfolios.queries'; 
import { Router } from '../routes';

import axios from 'axios';

class Portfolios extends React.Component {

  static async getInitialProps({ query }) {
    return { query };
  }

  renderPortfolio = _id => {
    Router.pushRoute(`/portfolio/${ _id }`);
  }

  renderPosts = posts => {
    const { portfolios } = this.props.data;
    return portfolios.map((post, index) => {
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <div 
                onClick={ () => this.renderPortfolio(post._id) } 
                style={{ border: 'solid 1px'}}>
                <CardBody>
                  <CardTitle>{ post.title}</CardTitle>
                  <CardSubtitle>{ post.position }</CardSubtitle>
                  <CardText>{ post.description }</CardText>
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
    const { posts, data: { portfolios } } = this.props;
    
    if(!portfolios) return <div />
    
    return (
      <BaseLayout { ...this.props.auth }>
        <BasePage className="portfolio-page" title="Portfolios">
            <ul>
              <Row>
                { this.renderPosts(posts) }
              </Row>
            </ul>
        </BasePage>
      </BaseLayout>
    )
  }
}

export default graphql(fetchPortfolios)(Portfolios);
