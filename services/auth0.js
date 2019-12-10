import auth0 from 'auth0-js';
import Cookies from 'js-cookie';

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

    isAuthenticated = () => {
        const expiresAt = Cookies.getJSON('expiresAt');

        // [IMPORTANT]
        // When we use browser's tool,
        // it is not working in Next.js
        //  because it is working without browser.

        // Particularly when we get data from browser's memory space,
        //  it is not working in server.
        // For instance following value is false in server terminal
        //  but the browser shows true.
        // To fix this issue please go to _app.js!!!!!! in page folder
        return new Date().getTime() < expiresAt;
    }

    // [ IMPORTANT ]
    // After define clientAuth in _app.js;
    clientAuth = () => {
        return this.isAuthenticated();
    }

    // req from "ctx" in _app.js
    serverAuth = req => {
        // [ IMPORTANT ~]
        // cookie is also from headers!!
        // console.log(req.headers.cookie)
        if(req.headers.cookie) {

            // [ IMPORTANT ] req.header is a saved value?
            const expiresAtCookie = req.headers.cookie
                .split(';')
                // trim for all array elements
                .find(cookie => cookie.trim()
                // Greate!!!!!!!!!!!!!!!!!!! [IMPORTANT]
                // Pure Javascript!!!!
                .startsWith('expiresAt='));
            
            if(!expiresAtCookie) {
                return undefined;
            }

            const expiresAt = expiresAtCookie.split('=')[1];
            return new Date().getTime() < Number(expiresAt);
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

        // console.log('authResult: ', authResult)
        // debugger
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

export default new Auth0();;