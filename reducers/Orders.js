import * as actions from '../actions/Orders';
import fp from 'lodash/fp';

const INITIAL_STATE = {
    orders: {},
    fetching: false,
    fetchingError: false,
    fetchingAll: false
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
            const isBuy = action.order.action === 'Buy';
            return isBuy ? {
                ...state,
                fetching: false,
                ...state.orders.buyOrders.push(action.order)
            } : {
                    ...state,
                    fetching: false,
                    ...state.orders.sellOrders.push(action.order)
                };
        case actions.ADD_ORDER_FAILURE:
        case actions.FETCH_ORDERS_ERROR:
            return {
                ...state,
                fetching: false,
                fetchingAll: false,
                fetchingError: action.message,
            };
        default:
            return state;
    }
};
