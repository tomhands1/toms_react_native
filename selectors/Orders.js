import fp from 'lodash/fp';
import { createSelector } from 'reselect';

const getRoot = state => state.order;
const getUser = state => state.account.user.accountNumber;

export const getAllOrders = fp.flow(
    getRoot,
    state => state.orders
);

export const getPrivateOrders = createSelector(
    getAllOrders,
    getUser,
    (allOrders, accountNumber) => ({
        buyOrders: allOrders.buyOrders.filter(x => x.accountNumber === accountNumber),
        sellOrders: allOrders.sellOrders.filter(x => x.accountNumber === accountNumber)
    })
);

export const getDepth = fp.flow(
    getRoot,
    state => state.depth
);

export const sellMaxPrice = fp.flow(
    getDepth,
    state => state.sellsDepth,
    fp.map(value => value.price),
    fp.max
);

export const sellMinPrice = fp.flow(
    getDepth,
    state => state.sellsDepth,
    fp.map(value => value.price),
    fp.min
);

export const buyMaxPrice = fp.flow(
    getDepth,
    state => state.buysDepth,
    fp.map(value => value.price),
    fp.max
);

export const buyMinPrice = fp.flow(
    getDepth,
    state => state.buysDepth,
    fp.map(value => value.price),
    fp.min
);

export const buyMaxQuantity = fp.flow(
    getDepth,
    state => state.buysDepth,
    fp.map(value => value.quantity),
    fp.max
);

export const sellMaxQuantity = fp.flow(
    getDepth,
    state => state.sellsDepth,
    fp.map(value => value.quantity),
    fp.max
);

export const getMaxAggregation = state => fp.max([sellMaxPrice(state), buyMaxPrice(state)]) - fp.min([buyMinPrice(state), sellMinPrice(state)]);

export const getMaxQuantity = state => fp.max([sellMaxQuantity(state), buyMaxQuantity(state)]);
