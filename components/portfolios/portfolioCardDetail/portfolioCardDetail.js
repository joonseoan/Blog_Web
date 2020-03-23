import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';

const PortfolioCardDetail = props => {
  
  const { 
      title, description, company, 
      position, location, startDate, endDate
  } = props.portfolio;

  return (
    <div>
      <Modal isOpen={ props.isModalOpen} toggle={ props.toggleModal }>
        <ModalHeader toggle={ props.toggleModal }>{ title }</ModalHeader>
        <ModalBody>
          <p><b>Description: </b>{ description }</p>
          <p><b>Company: </b>{ company }</p>
          <p><b>Position: </b>{ position }</p>
          <p><b>Location: </b>{ location }</p>
          <p><b>Start Date: </b>{ moment(startDate).format('MMMM DD, YYYY') }</p>
          <p><b>End Date: </b>{ endDate ? moment(endDate).format('MMMM DD, YYYY') : 'Present' }</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={ props.toggleModal }>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default PortfolioCardDetail;