import { GET_PORTFOLIOS } from '../reduxActions/type';

export default (state=[], action) => {
    switch(action.type) {
        case GET_PORTFOLIOS: 
            return [ ...action.payload ];
        default:
            return state;
    }
}