export const getCookieFromReq = (req, cookieInfo) => {
    if(req.headers.cookie) {
        const cookie = req.headers.cookie
                .split(';')
                .find(cookie => cookie.trim().startsWith(`${cookieInfo}=`))
            
        if(!cookie) {
            return undefined;
        }
        return cookie.split('=')[1];                
        // return token.toString();    
    }

}