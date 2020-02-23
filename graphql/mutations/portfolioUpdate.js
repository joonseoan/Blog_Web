import gql from 'graphql-tag';

export default gql`
    mutation UpdatePortfolio(
        $_id: ID!
        $title: String
        $company: String
        $location: String
        $position: String
        $description: String
        $startDate: Date
        $endDate: Date
    ) {
        updatePortfolio(data: {
            _id: $_id
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