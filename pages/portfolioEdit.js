import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { graphql } from 'react-apollo';
import moment from 'moment';

import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortforlioForm from '../components/portfolios/portfolioCreateForm/portfolioCreateForm';
import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';
import updatePortfolio from  '../graphql/mutations/portfolioUpdate';

class PortfolioEdit extends React.Component {
    state = {
        errorMessage: ''
    }

    handleUpdatePortfolio = async (portpolioData, setSubmitting) => {
        try {
          setSubmitting(true);
          const updatedPortfolio = await this.props.mutate({
              variables: portpolioData
          });

          if(!updatedPortfolio) {
              throw new Error('Unable to update the portfolio.');
          }

          setSubmitting(false);

          Router.pushRoute('/portfolios');

        } catch(e) {
            setSubmitting(false);
            this.setState({ errorMessage: 'Sorry, unexpected error occured.'})
            throw new Error(e);
        }
    }

    render() {
        const { portfolio, auth } = this.props;

        if(!portfolio) {
            return <div />;
        }

        const { startDate, endDate } = portfolio;

        const existingPortfolio = {
            ...portfolio, 
            startDate: moment(startDate),
            endDate: endDate ? moment(endDate) : undefined
        }
        
        return (
            <BaseLayout { ...auth }>
                <BasePage title="EDIT PORTFOLIO">
                    <div>
                        <div>
                            <PortforlioForm
                                savedPortfolio={ existingPortfolio }
                                handleUpdatePortfolio={ this.handleUpdatePortfolio }
                                errorMessage={ this.state.errorMessage }
                            />
                        </div>
                        <div>
                            <h1>Under Construction</h1>
                        </div>
                    </div>
                </BasePage>
            </BaseLayout>
        );
    }
}

const mapStateToProps = ({ portfolio }) => ({ portfolio });

export default withRouter(
    withAuth('app owner')(
        connect(mapStateToProps)(
            graphql(updatePortfolio)(PortfolioEdit)
        )
    )
);