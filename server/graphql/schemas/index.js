const portfolio = require('./portfolio.typeDefs');

// const { importSchema } = require('graphql-import');

// module.exports = importSchema('./schema.graphql');
// const portfolio = importSchema('./portfolio.graphql');
// console.log('portfolio schema: ', portfolio);

// const Query = `
//   type Query {
//     _empty: String
//   }
// `;

module.exports = [
    portfolio
]