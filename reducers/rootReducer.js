import { combineReducers } from 'redux';
import counter from './Counter';
import order from './Orders';
import account from './Account';

const rootReducer = combineReducers({
    counter,
    order,
    account,
});

export default rootReducer;
