const mongoose = require('mongoose');

const Portfolio = mongoose.model('Portfolio');

const Mutations = {
    createPortfolio: async (parent, { data }, context, info) => {
        try {     
            const portfolio = new Portfolio(data);
            const newPortfolio = await newPortfolio.save();
            if(!newPortfolio) {
                throw new Error('Unable to create the portfolio.')
            }
            return newPortfolio;
        } catch(e) {
            throw new Error(e);
        }
    }
}

module.exports = Mutations;