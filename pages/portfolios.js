import React from 'react';
import { Col, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'; 
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { Link } from '../routes';
import { graphql } from 'react-apollo';
import fetchPortfolios from '../graphql/queries/portfolio.queries'; 

import axios from 'axios';

class Portfolios extends React.Component {

  static async getInitialProps() {
    let posts = [];

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      posts = response.data;
    } catch(err) {
      console.error(err);
    }

    return {posts: posts.splice(0, 10)};
  }


  renderPosts(posts) {
  const { portfolios } = this.props.data;
    return portfolios.map((post, index) => {
      return (
        <Col md="4" key={index}>
          <React.Fragment>
            <span>
              <Card>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>{ post.title}</CardTitle>
                  <CardSubtitle>{ post.position }</CardSubtitle>
                  <CardText>{ post.description }</CardText>
                  <Button>Button</Button>
                </CardBody>
              </Card>
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
// export default Portfolios;
