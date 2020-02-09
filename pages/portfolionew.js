import React from 'react';
// import { Row, Col } from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortforlioCreateForm from '../components/portfolios/portfolioCreateForm/portfolioCreateForm';
import withAuth from '../components/hoc/withAuth';

class PortfolioNew extends React.Component {

    savePortfolio = portfolioData => {
        alert(JSON.stringify(portfolioData, null, 2));
    }
    
    render() {
        return(
            <BaseLayout { ...this.props.auth }>
                <BasePage className="portfolio-create-page" title="create new portfolio">
                    {/*
                        [ IMPORTANT ]
                        md is horizontal size of Col 
                        
                        <Row>
                            <Col md="5">
                                <PortforlioCreateForm />
                            </Col>
                        </Row> 
                    */}
                    <div className="sport">
                        <div className="sport__create">
                            <PortforlioCreateForm 
                                savePortfolio={ this.savePortfolio } 
                            />
                        </div>
                        <div className="sport_content">
                            <h1>Under Construction</h1>
                        </div>
                    </div>
                </BasePage>
            </BaseLayout>
        );
    }
};

export default withAuth('app owner')(PortfolioNew);