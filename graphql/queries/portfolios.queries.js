import gql from 'graphql-tag';

export default gql`
    {
        portfolios {
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