import { GET_PORTFOLIO } from '../reduxActions/type';

export default (state={}, action) => {
    switch(action.type) {
        case GET_PORTFOLIO:
            return { ...state, ...action.payload };
        default: 
            return state;
    }   
    return state;
}