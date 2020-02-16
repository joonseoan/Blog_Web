import gql from 'graphql-tag';

export default gql`
    mutation CreatePortfolio(
        $title: String!
        $company: String!
        $location: String!
        $position: String!
        $description: String!
        $startDate: Date!
        $endDate: Date
    ) {
        createPortfolio(data: {
            title: $title
            company: $company
            location: $location
            position: $position
            description: $description
            startDate: $startDate
            endDate: $endDate
        }) {
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