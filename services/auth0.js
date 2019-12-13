import auth0 from 'auth0-js';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios';

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
        const res = await axios.get('https://dev-plzr7dqq.auth0.com/.well-known/jwks.json');
        const jwks = res.data;

        return jwks;
    }

    verifyToken = async token => {
        if(!token) {
            return undefined;
        }


        // [ Decode from Token/(Decription)Key in Cookie]
        // "complete": return an object with the decoded payload and header.
        // In this scenario, we need to get "kid" in the header, now.
        // Then we can can implement getJWKS!!!
        const decodeToken = jwt.decode(token, { complete: true });
        // const decodeToken = jwt.decode(token);


        // [ Key from callback url reached by the auth server ]
        const jwks = await this.getJWKS();
        /* 
            jwks= { keys: Array(1) }
        */
        const [ key ] = jwks.keys;

        // token certification
        // Mapping the format same as key format from cooke
        let [ cert ] = key.x5c;
        cert = cert.match(/.{1,64}/g)
            .join('\n');
        cert = `-----BEGIN CERTIFICATE-----\n${cert}-----END CERTIFICATE-----\n`

        // [ Verification ]
        // Can bet header from decodeToken's complete option
        if(key.kid !== decodeToken.header.kid) {
            return undefined;
        }

        const verifiedToken = jwt.verify(token, cert);
        const expiresAt = decodeToken.exp * 1000;
        
        // ===> user info
        console.log('verifiedToken: ', verifiedToken)
        
        return verifiedToken && 
            decodeToken && 
            new Date().getTime() < expiresAt ? 
            decodeToken :
            undefined;
    }

    // [ IMPORTANT ]
    // After define clientAuth in _app.js;
    clientAuth = () => {

        const token = Cookies.getJSON('jwt');
        const verifiedToken = this.verifyToken(token);
        return verifiedToken;

        // return this.isAuthenticated();
    }

    // req from "ctx" in _app.js
    serverAuth = req => {
        
        // [ IMPORTANT ~]
        // cookie is also from headers!!
        // console.log('cookie: ', req.headers.cookie);

        if(req.headers.cookie) {
            
            // [ IMPORTANT ] req.header is a saved value?
            const tokenCookie = req.headers.cookie
                .split(';')
                // trim for all array elements
                .find(cookie => cookie.trim()
                // Greate!!!!!!!!!!!!!!!!!!! [IMPORTANT]
                // Pure Javascript!!!!
                .startsWith('jwt='));

            // console.log('tokenCookie: ', tokenCookie)

            // [ IMPORTANT ] req.header is a saved value?
            // const expiresAtCookie = req.headers.cookie
            //     .split(';')
            //     // trim for all array elements
            //     .find(cookie => cookie.trim()
            //     // Greate!!!!!!!!!!!!!!!!!!! [IMPORTANT]
            //     // Pure Javascript!!!!
            //     .startsWith('expiresAt='));
            
            if(!tokenCookie) {
                return undefined;
            }

            const token = tokenCookie.split('=')[1];
            const verifiedToken = this.verifyToken(token);

            if(!verifiedToken) {
                return undefined;
            }

            return verifiedToken;
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
                    resolve('Auth Callback Success');
                } else if (err) {
                    reject(err);
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