import gql from 'graphql-tag';

export default gql`
    query Portfolio($_id: ID!) {
        portfolio(_id: $_id) {
            _id
            userId
            title
            company
            location
            position
            description
            startDate
            endDate
        }
    }
`;
