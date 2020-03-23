import React, { Component, Fragment } from 'react';
import { CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap'
import PortfolioCardDetail from '../portfolioCardDetail/portfolioCardDetail';

export default class PorfolioCard extends Component {
  
  state={
    isModalOpen: false
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  };

  render() {
    const { title, position, description } = this.props.portfolio;
    
    return(
      <span onClick={ this.toggleModal }>
        <div  
          style={{ border: 'solid 1px' }}>
          <CardBody>
            <CardTitle>{ title }</CardTitle>
            <CardSubtitle>{ position }</CardSubtitle>
            <CardText>{ description }</CardText>
            { this.props.children }
          </CardBody>
        </div>
        <PortfolioCardDetail 
          toggleModal={ this.toggleModal }
          isModalOpen={ this.state.isModalOpen }
          portfolio={ this.props.portfolio }
        />
      </span>
    )
  }
}
