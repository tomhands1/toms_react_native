import moment from 'moment';

const adaptDateFormat = order => ({ ...order, timePlaced: moment(order.timePlaced).format('MMM Do YYYY, HH:mm:ss') });

export const adaptData = orders => {
    const adaptedBuyOrders = orders.buyOrders.map(buyOrder => adaptDateFormat(buyOrder));
    const adaptedSellOrders = orders.sellOrders.map(sellOrder => adaptDateFormat(sellOrder));
    const adaptedOrders = { buyOrders: adaptedBuyOrders, sellOrders: adaptedSellOrders };
    return adaptedOrders;
};
