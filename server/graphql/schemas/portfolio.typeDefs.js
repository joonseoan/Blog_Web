const { gql } = require('apollo-server-express');

module.exports = gql`

    scalar Date

    type Portfolio {
        _id: ID!
        userId: ID!
        title: String!
        company: String!
        location: String!
        position: String!
        description: String!
        startDate: Date
        endDate: Date
    }

    type Query {
        portfolios: [Portfolio]!
    }

    type Mutation {
        createPortfolio(data: createPortfolioInput): Portfolio!
        updatePortfolio(data: updatePortfolioInput): Portfolio!
        deletePortfolio(data: deletedPortfolioInput): DeleteMessage!
    }

    input createPortfolioInput {
        title: String!
        company: String!
        location: String!
        position: String!
        description: String!
        startDate: Date
        endDate: Date
    }

    input updatePortfolioInput {
        _id: ID!
        title: String
        company: String
        location: String
        position: String
        description: String
        startDate: Date
        endDate: Date
    }

    input deletedPortfolioInput {
        _id: ID!
    }

    type DeleteMessage {
        message: String!
    }
`;