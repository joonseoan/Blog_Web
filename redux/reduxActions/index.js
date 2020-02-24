import { GET_PORTFOLIO, GET_PORTFOLIOS } from './type';

export const savePortfolios = portfolios => {
    return { type: GET_PORTFOLIOS, payload: portfolios };
}

export const savePortfolio = (portfolio, runRedirect) => {
    runRedirect && runRedirect();
    return { type: GET_PORTFOLIO, payload: portfolio };
} 
