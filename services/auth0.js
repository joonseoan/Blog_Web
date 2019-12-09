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
        const expiresAt = Cookies.getJson('expiresAt');
        return new Date().getTime() < expiresAt;
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

        console.log('authResult: ', authResult)
        debugger
        const expiresAt = (Number(authResult.expiresIn) * 1000) + new Date().getTime();

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

    login = () => {
        this.auth0.authorize()
    }

}

export default new Auth0();;