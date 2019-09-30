import * as actions from '../actions/Trades';
import fp from 'lodash/fp';

const INITIAL_STATE = {
    trades: [],
    fetching: false,
    fetchingError: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.FETCH_TRADES_STARTED:
            return fp.set('fetching', true)(state);
        case actions.FETCH_TRADES_SUCCESS:
            return fp.flow(
                fp.set('fetching', false),
                fp.set('trades', action.trades)
            )(state);
        case actions.FETCH_TRADES_ERROR:
            return fp.flow(
                fp.set('fetching', false),
                fp.set('fetchingError', action.message)
            )(state);
        default:
            return state;
    }
};
