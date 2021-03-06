const mongoose = require('mongoose');
const Portfolio = mongoose.model('Portfolio');
const { checkJWTWithApollo, checkRoleWithApollo } = require('../../../services/auth');

const Queries = {
    
    portfolios: async (parent, args, { req }, info) => {        
        try {
            // 2)
            // Adding sort by "startDate"
            // { 'startDate': 1 } ascending
            // { 'startDate': -1 } descending
            const portfolios = await Portfolio
                .find({})
                .sort({ 'startDate': 1 });

            //1)
            // const portfolios = await Portfolio.find({});
            
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
            // console.log('portfolio: ', portfolio)
            
            /* 
                [ IMPORTANT ]
                When we want to not select the specific field or property,
                we can make out like this
                const portfolio = await Portfolio.findById(data._id)
                    .select('-firstName') // must put "-""
                    .exec(err, portfolio)
            */

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