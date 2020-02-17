import { GET_PORTFOLIO } from './type';

export const savePortfolio = (portfolio, runRedirect) => {
    runRedirect();
    return { type: GET_PORTFOLIO, payload: portfolio };
} 
