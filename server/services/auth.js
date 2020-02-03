const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const namespace = 'http://localhost:3000/';

/* 

    1) Receives implicitly jwt in "req.headers" of the background
       - If jwt is not available, it generaties error => app.use() error controller.   

    2) When valid jwt is received here,
        it parses the jwt
        and then runs the jwt validation.
        with jwks which is a secret key!
        - JWT is not valid => app.use() error controller.
 
    // as long as we use auth0,
    //  we receive secret key from auth0
    jwksUri : 'https://dev-plzr7dqq.auth0.com/.well-known/jwks.json'

    3) req.user is created
*/

// [ IMPORTANT ]!!!!!!!!
//  as long as this middleware is in argument lists in the end point,
//  it can implemnt req, res, and next!!!!!!!!!!!!!!!!!!!

// We can build m/w without calllback ===> no need to use next()
exports.checkJWT = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true, // default is false
        jwksRequestsPerMinute: 15, // default is 10

        // cacheMaxEntries: 5, // Default Value
        // cacheMaxAge: ms('10h'), // Default Value
        jwksUri: 'https://dev-plzr7dqq.auth0.com/.well-known/jwks.json'
    }),
    // [ ClientID in Auth0 ]
    audience: 'jjVFFtU7i1LRLUQuIJzhYl2TPNR9bz3K',
    // [ Domain in Auth0]
    // Need to specify "https:// .... /" DO NOT FORGET THE LAST "/"
    issuer: 'https://dev-plzr7dqq.auth0.com/',
    algorithms: ['RS256']
});

// Middleware
// [ IMPORTANT ]!!!!!!!!
//  as long as this middleware is in argument lists in the end point,
//  it can implemnt req, res, and next!!!!!!!!!!!!!!!!!!!
// exports.checkJWT = (req, res, next) => {
//     const isValidToken = false;

//     console.log('validation:')
//     if(isValidToken) {
//         // [ IMPORTANT ]
//         // 'next()' function will run next function which is (req, res) => {},
//         // a call back in the current endpoint.
//         // If it has another middleare checkJWT, Anothermiddleware, (req, res) => {}
//         //  it runs the Anothermiddleware.
//         // That another middleware needs to run next() again to run (req, res) => {}
//         next();
//     } else {
//         return res.status(401).send({ 
//             title: 'Not Authorized',
//             detail: 'Please login to get the service'
//         });
//     }
// }


exports.checkRole = role => (req, res, next) => {
    // Thanks to the middleware above,
    //  we can get req.user automatically.
    //  [ IMPORTANT ] It is why jwt-expresss is useful! 


    const user = req.user;
    if(user && user[`${namespace}role`] === role) {
        next();
    } else {
        return res.status(401).send({
            title: 'You are not authorized to access to this page',
            detail: 'I hate you!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1'
        });
    }

}