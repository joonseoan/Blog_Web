const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio');
const { checkJWTWithApollo, checkRoleWithApollo } = require('../../../services/auth');

const Mutations = {
    createPortfolio: async (parent, { data }, { req }, info) => {      
        
        try {

            checkJWTWithApollo(req);
            const isValidAuthorization = checkRoleWithApollo('app owner', req);
            if(!isValidAuthorization) {
                throw new Error('You are not authorized for this page');
            }

            const { title, company, location, position, 
                description } = data;
            
            if(!title || !company || !location || !position 
                || !description) {
                throw new Error('Sorry, you missed some fields')
            }

            const portfolio = new Portfolio({
                ...data,
                userId: req.user && req.user.sub
            });
            const newPortfolio = await portfolio.save();
            
            if(!newPortfolio) {
                throw new Error('Unable to create the portfolio.')
            }            
            return newPortfolio;
        } catch(e) {
            throw new Error(e)
        }    
    },
    updatePortfolio: async (parent, { data }, { req }, info) => {
        
        try {
            checkJWTWithApollo(req);
            const isValidAuthorization = checkRoleWithApollo('app owner', req);

            if(!isValidAuthorization) {
                throw new Error('You are not authorized for this page');
            }

            const portfolio = await Portfolio.findById(data._id);

            if(!portfolio) {
                throw new Error('Unable to find your portfolio');
            }

            if(portfolio.userId !== req.user.sub) {
                throw new Error('You are not authorized to access to this portfolio.')
            }

            portfolio.set(data);
            const savedPortfolio = await portfolio.save();
            if(!savedPortfolio) {
                throw new Error('Failed to update an updated portfolio.')
            }

            return savedPortfolio;

        } catch(e) {
            throw new Error(e);
        }
    },
    deletePortfolio: async (parent, { data }, { req }, info) => {
        
        try {
            checkJWTWithApollo(req);
            const isValidAuthorization = checkRoleWithApollo('app owner', req);

            if(!isValidAuthorization) {
                throw new Error('You are not authorized for this page');
            }

            const portfolio = await Portfolio.findById(data._id);
            if(!portfolio) {
                throw new Error('Unable to find the portfolio.');
            }
            if(portfolio.userId !== req.user.sub) {
                throw new Error('You are not authorized to delete this portfolio.');
            }

            const deletedPortfolio = await Portfolio.deleteOne({ _id: data._id });
            if(!deletedPortfolio) {
                throw new Error('Failed to delete this portfolio.');
            }
            return {
               message: `Successfully delete your ${ portfolio.title }`
            }
        } catch(e) {
            throw new Error(e);
        }   
    }
}

module.exports = Mutations;