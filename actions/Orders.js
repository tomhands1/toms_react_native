export const ADD_ORDER_STARTED = 'ADD_ORDER_STARTED';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILURE = 'ADD_ORDER_FAILURE';

export const FETCH_ORDERS_STARTED = 'FETCH_ORDERS_STARTED';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export const UPDATE_AGGREGATION = 'UPDATE_AGGREGATION';
export const UPDATE_DEPTH = 'UPDATE_DEPTH';
export const UPDATE_DEPTH_ERROR = 'UPDATE_DEPTH_ERROR';

export const addOrderStarted = order => ({
    type: ADD_ORDER_STARTED,
    order,
});

export const addOrderSuccess = orders => ({
    type: ADD_ORDER_SUCCESS,
    orders,
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

export const updateAggregation = aggregation => ({
    type: UPDATE_AGGREGATION,
    aggregation
});

export const updateDepth = depth => ({
    type: UPDATE_DEPTH,
    depth
});

export const updateDepthError = message => ({
    type: UPDATE_DEPTH_ERROR,
    message
});
