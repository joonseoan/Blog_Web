import gql from 'graphql-tag';

export default gql`
    mutation DeletePortfolio($_id: ID!) {
        deletePortfolio(_id: $_id)
    }
`;