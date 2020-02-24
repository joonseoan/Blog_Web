import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../helpers/utils';

// Apollo
import apolloClient from '../graphql/apolloClient';
import portfolio from '../graphql/queries/portfolio.queries';
import portfolios from '../graphql/queries/portfolios.queries';

// Auth unrequired
export const getPortfolios = async () => {
    try {
        const client = apolloClient();
        const response = await client.query({ query: portfolios });
        if(!response || response.length < 1) {
            throw new Error('Unable to fetch portfolio list');
        }
        return response;
    } catch(e) {
        throw new Error(e);
    }
}

export const getPortfolio = async (_id, req) => {
    try {        
        const token = setAuthHeader(req || null);
        const client = apolloClient(token);

        const { data } = await client.query({ 
            query: portfolio, 
            variables: { _id }
        });

        if(!data) {
            throw new Error('Unable to get a portfolio.');
        }
        
        return data;
    } catch(e) {
        throw new Error(e);
    }
}

// Auth Required
export const setAuthHeader = req => {
    let token;

    if(req) {
        token = getCookieFromReq(req, 'jwt');
    } else {
        token = Cookies.getJSON('jwt');
    }
    
    return token;
}

export const getSecretData = async req => {    
    try {
        const url = req ? 'http://localhost:3000/api/v1/secret' : '/api/v1/secret';
        const token = this.setAuthHeader(req || null); 
        const response = await axios.get(url, {
            headers: { 
                'authorization': token ? `Bearer ${token}` : ''
            }
        });

        return response.data;
    } catch(e) {
        throw new Error(e);
    }
}

// export const getSecretDataInServer = async req => {
//     try {

//         // [ IMPORTANT !!!!!!!!]
//         // Must get token from the node as same as before
//         // because in the server side, it is not able to browser's cookie.

//         // const tokenCookie = req.headers.cookie
//         //             .split(';')
//         //             .find(cookie => cookie.trim().startsWith('jwt='));
                
//         // if(!tokenCookie) {
//         //     throw new Error ('Unable to get JWT');
//         // }

//         // const token = tokenCookie.split('=')[1];
//         // console.log('token: ', token)
            
//         // when it is working in the server side which uses "port :80"
//         // we need to put "localhost:3000" because they are deiffernt ports
        
//         const token = setAuthHeader(req);

//         // console.log('token in the server', token)
//         const response = await axios.get('http://localhost:3000/api/v1/secret', {
//             headers: { 
//                 'authorization': token ? `Bearer ${token}` : ''
//             }
//         });

//         return response.data;

//     } catch(e) {
//         throw new Error(e);
//     }
// }