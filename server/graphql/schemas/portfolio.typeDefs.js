const { gql } = require('apollo-server-express');

module.exports = gql`

    scalar Date

    type Portfolio {
        userid: ID!
        title: String!
        company: String!
        location: String!
        position: String!
        description: String!
        startDate: Date!
        endDate: Date
    }

    type Query {
        portfolios: [Portfolio]!
    }

    type Mutation {
        createPortfolio(data: portfolioInput): Portfolio! 
    }

    input portfolioInput {
        title: String!
        company: String!
        location: String!
        position: String!
        description: String!
        startDate: Date!
        endDate: Date
    }

`;