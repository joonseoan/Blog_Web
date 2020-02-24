import React from 'react';
import { connect } from 'react-redux';
import BaseLayout from '../components/layouts/BaseLayout';
import BasePage from '../components/BasePage';
import { withRouter } from 'next/router'
import axios from 'axios';
import withAuth from '../components/hoc/withAuth';
import { Router } from '../routes';
import { getPortfolios } from '../actions/';
import { savePortfolios } from '../redux/reduxActions';

class Portfolio extends React.Component {

  componentDidMount = async () => {
    const { portfolio } = this.props;
    if(!portfolio) {
      const { data: { portfolios }} = await getPortfolios();
      this.props.savePortfolios(portfolios);
    } else {
      return;
    }   
  }

  renderPortfolioEdit = () => {
    const { _id } = this.props.portfolio;
    Router.pushRoute(`/portfolio/${ _id }/edit`);
  }

  render () {    
    const { auth, portfolio } = this.props;

    if(!portfolio) {
      return <div />;
    }
    
    return (
      <BaseLayout { ...auth }>
        <BasePage title="Portfolio">
          <h1> {portfolio.title} </h1>
          <p> BODY: {portfolio.position} </p>
          <p> ID:  {portfolio._id} </p>
          <button onClick={ this.renderPortfolioEdit }>EDIT PORTFOLIO</button>
        </BasePage>
      </BaseLayout>
    )
  }
}

const mapStateToProps = ({ portfolios }, ownProps) => {  
  const portfolio = portfolios.find(portfolio => 
          portfolio._id === ownProps.router.query.id);  

  return { portfolio };
  
};

//  [ IMPORTANT !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!]
// must use withRouter to use "connect" of Redux
export default withRouter(
  connect(mapStateToProps, { savePortfolios })(Portfolio)
)



// [ IMPORTANT ]
// const mapStateToProps = ({ portfolio }) => {
//   console.log('portfolio:---> ', portfolio)
//   return {
//     portfolio
//   };
// }

// [ With Server Side GraphQL Query ]
// export default withAuth('app owner')(
//     connect(mapStateToProps, { getPortfolio })(Portfolio)
// );

// export default withAuth('app owner')(Portfolio);

// [ With Pure Graphql in Client Side ]
// export default withAuth('app owner')(
//   graphql(fetchPortfolio, {
//     options: props => {
//       const { portfolioId } = props.pageProps
//         return { variables: { _id: portfolioId || '' }}}
//   })(
//     withRouter(Portfolio)
//   )
// );