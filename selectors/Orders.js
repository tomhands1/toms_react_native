import fp from 'lodash/fp';

const getRoot = state => state.order;

export const getAllOrders = fp.flow(
    getRoot,
    state => state.orders
);
