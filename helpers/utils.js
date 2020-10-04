export const getCookieFromReq = (req, cookieInfo) => {
    if(req.headers.cookie) {
        console.log('req.headers: ', req.headers)
        const cookie = req.headers.cookie
                .split(';')
                .find(cookie => cookie.trim().startsWith(`${cookieInfo}=`))
            
        if(!cookie) {
            return undefined;
        }
        
        return cookie.split('=')[1];                
    }
}

