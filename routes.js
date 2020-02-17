const routes = require('next-routes')

// For params!!!!!!!!!
module.exports = routes()
    .add('portfolio', '/portfolio/:id')
    .add('portfolioEdit', '/portfolio/:id/edit');
