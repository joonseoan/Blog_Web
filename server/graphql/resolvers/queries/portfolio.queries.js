const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');
const { checkJWTWithApollo, checkRoleWithApollo } = require('../../../services/auth');

const Queries = {
    
    portfolios: async (parent, args, { req }, info) => {        
        try {
            const portfolios = await Portfolio.find({});
            if(!portfolios) {
                throw new Error('Unable to get all user portfolios');
            }
            return portfolios;
        } catch(e) {
            throw new Error(e);
        }
    },

    portfolio: async (parent, { _id }, { req }, info) => {
        try {

            checkJWTWithApollo(req);
            const isValidAuthorization = checkRoleWithApollo('app owner', req);
            if(!isValidAuthorization) {
                throw new Error('You are not authorized for this page');
            }

            const portfolio = await Portfolio.findById(_id);
            if(!portfolio) {
                throw new Error('Unable to find the portfolio.');
            }
            return portfolio;
        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = Queries;