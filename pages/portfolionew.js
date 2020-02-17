import React from 'react';
// import { Row, Col } from 'reactstrap';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortforlioForm from '../components/portfolios/portfolioCreateForm/portfolioCreateForm';
import withAuth from '../components/hoc/withAuth';
import { graphql } from 'react-apollo';
import portfolioCreate from '../graphql/mutations/portfolioCreate';
import { withRouter } from 'next/router';
import { Router } from '../routes';

class PortfolioNew extends React.Component {

    state = {
        errorMessage: ''
    }

    savePortfolio = async (portfolioData, { setSubmitting } ) => {
        // submitting status
        setSubmitting(true);
        try {
            const newPortfolio = await this.props.mutate({ 
                variables: portfolioData 
            });

            if(!newPortfolio) {
                throw new Error('Unable to create a new portfolio.');
            }
            setSubmitting(false);
            // [IMPORTANT: a way to use route ]
            if(!this.state.errorMessage) {
                // [ when using routes.js customized ]
                Router.pushRoute('/portfolios');
                // [ When using "withRouter"]
                // this.props.router.push('/portfolios');
            }
        } catch(e) {
            setSubmitting(false);
            this.setState({ errorMessage: 'Sorry, unexpected error occured.'})
            throw new Error(e);
        }        
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
                            <PortforlioForm 
                                savePortfolio={ this.savePortfolio }
                                errorMessage={ this.state.errorMessage }
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

export default withAuth('app owner')(
    graphql(portfolioCreate)(
       withRouter(PortfolioNew)
    )
);