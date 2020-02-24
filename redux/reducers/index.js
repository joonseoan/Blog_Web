import { combineReducers } from 'redux';

import portfolio from './portfolio';
import portfolios from './portfolios';

export default combineReducers({
    portfolio,
    portfolios
});

