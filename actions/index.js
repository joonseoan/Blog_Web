import axios from 'axios';
import Cookies from 'js-cookie';

import { getCookieFromReq } from '../helpers/utils';

const setAuthHeader = req => {

 let token;
 if(req) {
    token = getCookieFromReq(req, 'jwt');
 } else {
    token = Cookies.getJSON('jwt');
 }
 return token;
}

export const getSecretData = async req => {
    
    const url = req ? 'http://localhost:3000/api/v1/secret' : '/api/v1/secret';
    console.log('url =========================>', url)
    const token = setAuthHeader(req || null); 

    console.log('token: ------------------->', token)
    
    try {
        const response = await axios.get(url, {
            headers: { 
                'authorization': token ? `Bearer ${token}` : ''
            }
        });

        console.log('response.data: ===> ', response.data)
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