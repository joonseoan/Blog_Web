import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

import { getCookieFromReq } from '../helpers/utils'

class Auth0 {        
    constructor() {
        this.auth0 = new auth0.WebAuth({
            domain: 'dev-plzr7dqq.auth0.com',
            clientID: 'jjVFFtU7i1LRLUQuIJzhYl2TPNR9bz3K',
            redirectUri: 'http://localhost:3000/callback',
            responseType: 'token id_token',
            scope: 'openid profile'
        });
    }

    // isAuthenticated = () => {
    //     const expiresAt = Cookies.getJSON('expiresAt');

    //     // [IMPORTANT]
    //     // When we use browser's tool,
    //     // it is not working in Next.js
    //     //  because it is working without browser.

    //     // Particularly when we get data from browser's memory space,
    //     //  it is not working in server.
    //     // For instance following value is false in server terminal
    //     //  but the browser shows true.
    //     // To fix this issue please go to _app.js!!!!!! in page folder
    //     return new Date().getTime() < expiresAt;
    // }

    // JWKS: JW key set "to verify token!!!"
    getJWKS = async () => {
        try{

            const res = await axios.get('https://dev-plzr7dqq.auth0.com/.well-known/jwks.json');
            
            if(!res.data) {
                throw new Error('Unable to get JWKS')
            }

            const jwks = res.data;
            return jwks;

        } catch(e) {
            throw new Error(e)
        }
    }

    verifyToken = async token => {

        if(!token) {
            return undefined;
        }

        try {
            // [ Decode from Token / (Decription) Key in Cookie]
            // "complete": return an object with the decoded payload and header.
            // In this scenario, we need to get "kid" in the header, now.
            // Then we can can implement getJWKS!!! to compare "kid" from callback url
            const decodeToken = jwt.decode(token, { complete: true });
            // const decodeToken = jwt.decode(token);

            // When user manually changes the token value in the browser,
            //  it shows server internal error
            //  because "decodeToken" can not be specified with user information
            // When token is not available or when token is incorrect!
            if(!decodeToken) {
                return undefined;
                // throw new Error('Invalid User on Cookie')
            }

            // [ Key from callback url reached by the auth server ]
            const jwks = await this.getJWKS();
            /* 
                jwks= { keys: Array(1) }
            */
            // [ Build Certificate]
            const [ key ] = jwks.keys;

            // token certification
            // Mapping the format same as key format from cooke
            let  [ cert ] = key.x5c;
            
            // [ IMPORTANT ]
            // It means 64 characters in a line
            //  Then each each line into the next line from the second element
            cert = cert.match(/.{1,64}/g).join('\n');
            cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
            
            
            // [ Verification ]
            // Can bet header from decodeToken's complete option
            if(key.kid !== decodeToken.header.kid) {
                // throw new Error('kids are different');
                return undefined;
            }

            const verifiedToken = jwt.verify(token, cert);
            // It is same!!!!! user info
            // console.log('COMPARISION: ', decodeToken, verifiedToken)            

            const expiresAt = decodeToken.payload.exp * 1000;

            // verifiedToken && decodeToken : means that they are correctly decrypted.
            return (verifiedToken && 
                new Date().getTime() < expiresAt) ? 
                verifiedToken :
                undefined;

        } catch(e) {
            return undefined;
            // throw new Error(e);
        }
    }

    // [ IMPORTANT ]
    // After define clientAuth in _app.js;
    clientAuth = async () => {
        try {
            const token = Cookies.getJSON('jwt');
            const verifiedToken = await this.verifyToken(token);
            
            if(!verifiedToken) {
                return undefined;
                // throw new Error('Unable to get verifiedToken')
            }

            return verifiedToken;
            // return this.isAuthenticated();
        } catch(e) {
            // [ IMPORTANT!!!!!!!!!!!!! new throw Error VS. return undefined!!! ]
            // throw new Error (just throw Error!!!!!! to console....and stop hee)
            // return undefined ====> undefined is a still value. then return "undefined"
            // throw new Error(e);
            // return undefined;

            throw new Error(e);
        }
    }

    // req from "ctx" in _app.js
    serverAuth = async req => {

        try {
            // [ IMPORTANT ~]
            // cookie is also from headers!!
            // console.log('cookie: ', req.headers.cookie);

            if(req.headers.cookie) {

                const token = getCookieFromReq(req, 'jwt');

                // // [ IMPORTANT ] req.header is a saved value?
                // const tokenCookie = req.headers.cookie
                //     .split(';')
                //     // trim for all array elements
                //     // Then if startsWith('jwt=') is true;
                //     //  get that value
                //     .find(cookie => cookie.trim().startsWith('jwt=')) // When it is true!!
                    
                
                // if(!tokenCookie) {
                //     return undefined;
                // }

                // const token = tokenCookie.split('=')[1]; 
                const verifiedToken = await this.verifyToken(token);
         
                if(!verifiedToken) {
                    return undefined;
                    // throw new Error('Unable to get verifiedToken in server')
                }

                return verifiedToken;           
            }
        } catch(e) {
            return undefined;
            // throw new Error(e);
        }
    }

    handleAuthentication = () => {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                // console.log('authResult: ========> ', authResult)
                /* 
                    authResult: {
                        authToken,
                        idToken,
                        idTokenPayload,
                        appState
                        .
                        .
                        .
                    }
                    
                    When the page moves to the callback page,
                    it receives auth Token, idToke, and etc from Google.
                */
                if(authResult && authResult.accessToken && authResult.idToken) {
                    this.setSession(authResult);
                    return resolve('Auth Callback Success');
                } else if (err) {
                    return reject(err);
                }
            });
        });
    }  

    // receive the 
    setSession = authResult => {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        // localStorage.setItem('access_token', authResult.accessToken);
        // localStorage.setItem('id_token', authResult.idToken);
        // localStorage.setItem('expiresAt', expiresAt);

        Cookies.set('user', authResult.idTokenPayload);
        Cookies.set('jwt', authResult.idToken);
        Cookies.set('expiresAt', expiresAt);
    }

    logout = () => {
        Cookies.remove('user');
        Cookies.remove('jwt');
        Cookies.remove('expiresAt');

        this.auth0.logout({
            returnTo: '',
            clientID: 'jjVFFtU7i1LRLUQuIJzhYl2TPNR9bz3K',
        });
    }

    // Only populates the auth0 creen
    login = () => {
        this.auth0.authorize()
    }
}

export default new Auth0();