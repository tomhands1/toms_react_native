import * as actions from '../actions/Orders';
import fp from 'lodash/fp';

const INITIAL_STATE = {
    orders: {},
    depth: {},
    fetching: false,
    fetchingError: false,
    fetchingAll: false,
    aggregation: 5
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.FETCH_ORDERS_STARTED:
            return fp.set('fetchingAll', true)(state);
        case actions.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                fetchingAll: false,
                orders: action.orders
            };
        case actions.ADD_ORDER_STARTED:
            return fp.set('fetching', true)(state);
        case actions.ADD_ORDER_SUCCESS:
            return fp.flow(
                fp.set('fetching', false),
                fp.set('orders', action.orders),
            )(state);
        case actions.ADD_ORDER_FAILURE:
        case actions.FETCH_ORDERS_ERROR:
            return {
                ...state,
                fetching: false,
                fetchingAll: false,
                fetchingError: action.message,
            };
        case actions.UPDATE_AGGREGATION:
            return fp.set('aggregation', action.aggregation)(state);
        case actions.UPDATE_DEPTH:
            return fp.set('depth', action.depth)(state);
        case actions.UPDATE_DEPTH_ERROR:
            return fp.set('fetchingError', action.message)(state);
        default:
            return state;
    }
};
