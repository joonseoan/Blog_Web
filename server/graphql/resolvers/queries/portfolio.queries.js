const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio');
const { checkJWTWithApollo, checkRoleWithApollo } = require('../../../services/auth');

const Queries = {
    portfolios: async (parent, args, { req }, info) => {
        
        console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddd')
        try {
            // checkJWTWithApollo(req);
            // const isValidAuthorization = checkRoleWithApollo('app owner', req);
            // if(!isValidAuthorization) {
            //     throw new Error('You are not authorized for this page');
            // }

            const portfolios = await Portfolio.find({});
        
            if(!portfolios) {
                throw new Error('Unable to get all user portfolios');
            }

            return portfolios;

        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = Queries;