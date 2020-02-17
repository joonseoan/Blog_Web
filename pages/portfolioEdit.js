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

class PortfolioEdit extends React.Component {
    render() {
        if(!this.props.portfolio) {
            return <div />;
        }

        const { startDate, endDate } = this.props.portfolio;

        const data = {
            ...this.props.portfolio, 
            startDate: moment(startDate),
            endDate: endDate ? moment(endDate) : undefined
        }
        
        return (
            <BaseLayout { ...this.props.auth }>
                <BasePage title="Edit Portfolio">
                    <div>
                        <div>
                            <PortforlioForm
                                savedPortfolio={ data }
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
        connect(mapStateToProps)(PortfolioEdit)
    )
);