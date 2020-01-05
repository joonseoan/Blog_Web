import React from 'react';
import { Row, Col } from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortforlioCreateForm from '../components/portfolios/portfolioCreateForm';
import withAuth from '../components/hoc/withAuth';

class PortfolioNew extends React.Component {
    render() {
        return(
            <BaseLayout { ...this.props.auth }>
                <BasePage className="portfolio-create-page" title="create new portfolio">
                    <Row>
                        {/*
                            [ IMPORTANT ]
                            md is horizontal size of Col 
                         
                         */}
                        <Col md="5">
                            <PortforlioCreateForm />
                        </Col>
                    </Row>
                </BasePage>
            </BaseLayout>
        );
    }
};

export default withAuth('app owner')(PortfolioNew);