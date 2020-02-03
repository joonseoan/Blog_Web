const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

const apolloServer = new ApolloServer({
    schema,
    playground: {
        settings: {
            'request.credentials': 'include'
        } 
    },
    engine: {
        debugPrintReports: true,
    },
    resolverValidationOptions: {
        requireResolversForResolveType: false,
    },
    context({ req }) {
        return{ req };
    }
});

module.exports = apolloServer;