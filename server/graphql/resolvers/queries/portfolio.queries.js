const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio');

const Queries = {
    portfolios: async (parent, args, context, info) => {
        try {
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