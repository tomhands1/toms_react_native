export const ADD_ORDER_STARTED = 'ADD_ORDER_STARTED';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

export const FETCH_ORDERS_STARTED = 'FETCH_ORDERS_STARTED';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export const addOrderStarted = order => ({
    type: ADD_ORDER_STARTED,
    order,
});

export const addOrderSuccess = order => ({
    type: ADD_ORDER_SUCCESS,
    order,
});

export const addOrderFailure = error => ({
    type: ADD_ORDER_FAILURE,
    error,
});

export const fetchOrdersStarted = () => ({
    type: FETCH_ORDERS_STARTED
});

export const fetchOrdersSuccess = orders => ({
    type: FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersError = error => ({
    type: FETCH_ORDERS_ERROR,
    error
});
