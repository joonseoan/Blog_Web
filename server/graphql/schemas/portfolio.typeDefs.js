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
        startDate: Date!
        endDate: Date
    }

    type Query {
        portfolios: [Portfolio]!
        portfolio(_id: ID!): Portfolio!
    }

    type Mutation {
        createPortfolio(data: createPortfolioInput): Portfolio!
        updatePortfolio(data: updatePortfolioInput): Portfolio!
        deletePortfolio(_id: ID!): String!
    }

    input createPortfolioInput {
        title: String!
        company: String!
        location: String!
        position: String!
        description: String!
        startDate: Date!
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
`;