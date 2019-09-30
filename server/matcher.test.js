import Matcher from './matcher';
import order from './Order';

const price = { small: 10, medium: 20, large: 30 };
const quantity = { small: 10, medium: 20, large: 30 };

describe('Basic Testing', () => {
    let matcher;
    let buyOrder1;
    let sellOrder1;
    let buyOrder2;
    let sellOrder2;
    let buyOrder3;
    let sellOrder3;

    beforeEach(() => {
        matcher = new Matcher();
        buyOrder1 = order('1', price.small, quantity.small, new Date(), 'Buy');
        sellOrder1 = order('2', price.small, quantity.small, new Date(), 'Sell');
        buyOrder2 = order('3', price.medium, quantity.small, new Date(), 'Buy');
        sellOrder2 = order('4', price.medium, quantity.small, new Date(), 'Sell');
        buyOrder3 = order('5', price.large, quantity.small, new Date(), 'Buy');
        sellOrder3 = order('6', price.large, quantity.small, new Date(), 'Sell');
    });

    it('Testing that a Buy order will add to the correct orderbook', () => {
        matcher.match(buyOrder1);
        expect(matcher.buyOrders.length).toBe(1);
        expect(matcher.sellOrders.length).toBe(0);
    });
    it('Testing that a Sell order will add to the correct orderbook', () => {
        matcher.match(sellOrder1);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders.length).toBe(1);
    });

    it('Testing that mulitple Buy orders will add to the correct orderbook', () => {
        matcher.match(buyOrder1);
        matcher.match(buyOrder2);
        matcher.match(buyOrder3);
        expect(matcher.buyOrders.length).toBe(3);
        expect(matcher.sellOrders.length).toBe(0);
    });

    it('Testing that mulitple Sell orders will add to the correct orderbook', () => {
        matcher.match(sellOrder1);
        matcher.match(sellOrder2);
        matcher.match(sellOrder3);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders.length).toBe(3);
    });

    it('Only available Buy order price is too low to match Sell order, both orders added to their correct orderbook', () => {
        matcher.match(buyOrder1);
        matcher.match(sellOrder2);
        expect(matcher.buyOrders.length).toBe(1);
        expect(matcher.sellOrders.length).toBe(1);
    });
});

describe('Sorting Functions', () => {
    let matcher;
    let buyOrder1;
    let sellOrder1;
    let buyOrder2;
    let sellOrder2;
    let buyOrder3;
    let sellOrder3;
    let buyOrder4;
    let sellOrder4;
    let buyOrder5;
    let sellOrder5;

    beforeEach(() => {
        matcher = new Matcher();
        buyOrder1 = order('1', price.small, quantity.small, 1, 'Buy');
        sellOrder1 = order('2', price.small, quantity.small, 2, 'Sell');
        buyOrder2 = order('3', price.medium, quantity.small, 3, 'Buy');
        sellOrder2 = order('4', price.medium, quantity.small, 4, 'Sell');
        buyOrder3 = order('5', price.large, quantity.small, 5, 'Buy');
        sellOrder3 = order('6', price.large, quantity.small, 6, 'Sell');
        buyOrder4 = order('7', price.medium, quantity.small, 7, 'Buy');
        sellOrder4 = order('8', price.medium, quantity.small, 8, 'Sell');
        buyOrder5 = order('9', price.small, quantity.small, 9, 'Buy');
        sellOrder5 = order('10', price.small, quantity.small, 10, 'Sell');
    });

    it('Test multiple buy orders sort from price largest to lowest', () => {
        matcher.match(buyOrder1);
        matcher.match(buyOrder2);
        matcher.match(buyOrder3);
        expect(matcher.buyOrders.length).toBe(3);
        expect(matcher.buyOrders).toEqual([buyOrder3, buyOrder2, buyOrder1]);
    });

    it('Test multiple sell orders sort from price lowest to largeest', () => {
        matcher.match(sellOrder3);
        matcher.match(sellOrder2);
        matcher.match(sellOrder1);
        expect(matcher.sellOrders.length).toBe(3);
        expect(matcher.sellOrders).toEqual([sellOrder1, sellOrder2, sellOrder3]);
    });

    it('Test multiple buy orders, with the same price, sort based on the time they were placed', () => {
        matcher.match(buyOrder5);
        matcher.match(buyOrder1);
        expect(matcher.buyOrders.length).toBe(2);
        expect(matcher.buyOrders).toEqual([buyOrder1, buyOrder5]);
    });

    it('Test multiple sell orders, with the same price, sort based on the time they were placed', () => {
        matcher.match(sellOrder5);
        matcher.match(sellOrder1);
        expect(matcher.sellOrders.length).toBe(2);
        expect(matcher.sellOrders).toEqual([sellOrder1, sellOrder5]);
    });

    it('Test multiple buy orders, with varying prices and times placed and expect priority ordering to be price largeest to lowest then time', () => {
        matcher.match(buyOrder1);
        matcher.match(buyOrder2);
        matcher.match(buyOrder3);
        matcher.match(buyOrder4);
        matcher.match(buyOrder5);
        expect(matcher.buyOrders.length).toBe(5);
        expect(matcher.buyOrders).toEqual([buyOrder3, buyOrder2, buyOrder4, buyOrder1, buyOrder5]);
    });

    it('Test multiple buy orders, with varying prices and times placed and expect priority ordering to be price lowest to largeest then time', () => {
        matcher.match(sellOrder1);
        matcher.match(sellOrder2);
        matcher.match(sellOrder3);
        matcher.match(sellOrder4);
        matcher.match(sellOrder5);
        expect(matcher.sellOrders.length).toBe(5);
        expect(matcher.sellOrders).toEqual([sellOrder1, sellOrder5, sellOrder2, sellOrder4, sellOrder3]);
    });
});

describe('Matcher with varying prices and identical quantites', () => {
    let matcher;
    let buyOrder1;
    let sellOrder1;
    let buyOrder2;
    let sellOrder2;
    let buyOrder3;
    let sellOrder3;
    let buyOrder4;
    let sellOrder4;
    let buyOrder5;
    let sellOrder5;

    beforeEach(() => {
        matcher = new Matcher();
        buyOrder1 = order('1', price.small, quantity.small, 1, 'Buy');
        sellOrder1 = order('2', price.small, quantity.small, 2, 'Sell');
        buyOrder2 = order('3', price.medium, quantity.small, 3, 'Buy');
        sellOrder2 = order('4', price.medium, quantity.small, 4, 'Sell');
        buyOrder3 = order('5', price.large, quantity.small, 5, 'Buy');
        sellOrder3 = order('6', price.large, quantity.small, 6, 'Sell');
        buyOrder4 = order('7', price.medium, quantity.small, 7, 'Buy');
        sellOrder4 = order('8', price.medium, quantity.small, 8, 'Sell');
        buyOrder5 = order('9', price.small, quantity.small, 9, 'Buy');
        sellOrder5 = order('10', price.small, quantity.small, 10, 'Sell');
    });

    it('Matches a buy order with an identical sell order, nothing left in the matcher', () => {
        matcher.match(buyOrder1);
        matcher.match(sellOrder1);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders.length).toBe(0);
    });

    it('Matches a buy order with a lower priced sell order, nothing left in the matcher', () => {
        matcher.match(buyOrder2);
        matcher.match(sellOrder1);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders.length).toBe(0);
    });

    it('Fails to match a buy order with an sell order as sell order price too large', () => {
        matcher.match(sellOrder2);
        matcher.match(buyOrder1);
        expect(matcher.buyOrders.length).toBe(1);
        expect(matcher.sellOrders.length).toBe(1);
    });

    it('Two buy orders available but sell order can not match first buy so should match with second', () => {
        matcher.match(buyOrder1);
        matcher.match(buyOrder2);
        matcher.match(sellOrder2);
        expect(matcher.buyOrders.length).toBe(1);
        expect(matcher.sellOrders.length).toBe(0);
        expect(matcher.buyOrders[0].accountNumber).toBe('1');
    });

    it('Three sell orders available but buy order would like the lowest available price', () => {
        matcher.match(sellOrder3);
        matcher.match(sellOrder1);
        matcher.match(sellOrder2);
        matcher.match(buyOrder2);
        expect(matcher.sellOrders.length).toBe(2);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders).toEqual([sellOrder2, sellOrder3]);
    });

    it('Multiple buy and sell orders which should all cancel eachother out due to the order they are passed into Matcher', () => {
        matcher.match(buyOrder1);
        matcher.match(sellOrder1);
        matcher.match(buyOrder2);
        matcher.match(sellOrder2);
        matcher.match(buyOrder3);
        matcher.match(sellOrder3);
        matcher.match(buyOrder4);
        matcher.match(sellOrder4);
        matcher.match(buyOrder5);
        matcher.match(sellOrder5);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders.length).toBe(0);
    });
});

describe('Matcher with varying quantites and equal prices', () => {
    let matcher;
    let buyOrder1;
    let sellOrder1;
    let buyOrder2;
    let sellOrder2;
    let buyOrder3;
    let sellOrder3;

    beforeEach(() => {
        matcher = new Matcher();
        buyOrder1 = order('1', price.small, quantity.small, 1, 'Buy');
        sellOrder1 = order('2', price.small, quantity.medium, 2, 'Sell');
        buyOrder2 = order('3', price.small, 40, 3, 'Buy');
        sellOrder2 = order('4', price.small, 35, 4, 'Sell');
        buyOrder3 = order('5', price.small, 50, 5, 'Buy');
        sellOrder3 = order('6', price.small, 45, 6, 'Sell');
    });

    it('Matches a Buy order with a Sell order at the same price but varying quantities', () => {
        matcher.match(sellOrder1);
        matcher.match(buyOrder1);
        expect(matcher.sellOrders[0].quantity).toBe(10);
        expect(matcher.buyOrders.length).toBe(0);
    });

    it('Matches a Buy with a Sell of greater quantity and updates the quantity of the Sell Order', () => {
        matcher.match(buyOrder1);
        matcher.match(sellOrder1);
        expect(matcher.buyOrders.length).toBe(0);
        expect(matcher.sellOrders.length).toBe(1);
        expect(matcher.sellOrders[0].quantity).toBe(10);
    });

    it('Matches mulitple Buy and Sell orders placed in order of Buy then Sell and everything should trade', () => {
        matcher.match(buyOrder1);
        matcher.match(sellOrder1);
        matcher.match(buyOrder2);
        matcher.match(sellOrder2);
        matcher.match(buyOrder3);
        matcher.match(sellOrder3);
        expect(matcher.sellOrders.length).toBe(0);
        expect(matcher.buyOrders.length).toBe(0);
    });
});

describe('Matcher with varying quantites and varying prices', () => {
    let matcher;
    let buyOrder1;
    let sellOrder1;
    let buyOrder2;
    let sellOrder2;
    let sellOrder3;

    beforeEach(() => {
        matcher = new Matcher();
        buyOrder1 = order('1', price.small, quantity.small, 1, 'Buy');
        sellOrder1 = order('2', price.medium, quantity.medium, 2, 'Sell');
        buyOrder2 = order('3', price.medium, 40, 3, 'Buy');
        sellOrder2 = order('4', price.small, 35, 4, 'Sell');
        sellOrder3 = order('6', 40, 45, 6, 'Sell');
    });

    it('Orders two Sell orders and matches two Buy orders with these Sell orders with varying prices and varying quantities', () => {
        matcher.match(sellOrder1);
        matcher.match(sellOrder2);
        matcher.match(buyOrder1);
        matcher.match(buyOrder2);
        expect(matcher.sellOrders[0].quantity).toBe(5);
        expect(matcher.buyOrders.length).toBe(0);
    });

    it('Orders two Buy orders and matches a two Sell orders with these Buy orders with varying prices and varying quantities', () => {
        matcher.match(buyOrder1);
        matcher.match(buyOrder2);
        matcher.match(sellOrder3);
        matcher.match(sellOrder1);
        expect(matcher.sellOrders).toEqual([sellOrder3]);
        expect(matcher.buyOrders.length).toBe(2);
    });
});
