import { combineReducers } from 'redux';
import counter from './Counter';
import order from './Orders';
import account from './Account';
import trades from './Trades';

const rootReducer = combineReducers({
    counter,
    order,
    account,
    trades
});

export default rootReducer;
