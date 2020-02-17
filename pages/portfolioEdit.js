import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import PortforlioForm from '../components/portfolios/portfolioCreateForm/portfolioCreateForm';
import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';

class PortfolioEdit extends React.Component {
    render() {
        console.log(this.props.portfolio)
        if(!this.props.portfolio) {
            return <div />;
        }
        return (
            <BaseLayout { ...this.props.auth }>
                <BasePage title="Edit Portfolio">
                    <div>
                        <div>
                            <PortforlioForm
                                
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