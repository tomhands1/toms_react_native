import Matcher from './matcher';
import order from './Order';

describe('Trades between accounts and how they are organised', () => {
    let matcher;
    let buy1Account1;
    let sell1Account1;
    let buy2Account1;
    let sell2Account1;


    beforeEach(() => {
        matcher = new Matcher();
        buy1Account1 = order(1, 10, 10, 1, 'Buy');
        sell1Account1 = order(1, 20, 20, 2, 'Sell');
        buy2Account1 = order(1, 20, 40, 3, 'Buy');
        sell2Account1 = order(1, 30, 35, 4, 'Sell');
    });

    it('Given four orders from the same account, private orderbook for this account will contain all', () => {
        matcher.match(buy1Account1);
        matcher.match(sell1Account1);
        matcher.match(buy2Account1);
        matcher.match(sell2Account1);

        expect(matcher.getPrivateOrders(1).buyOrders.length).toBe(2);
        expect(matcher.getPrivateOrders(2).buyOrders.length).toBe(0);
        expect(matcher.getPrivateOrders(1).sellOrders[0].timePlaced).toEqual(2);
    });

    it('Given two buy orders from the same account, private orderbook is ordered with most recent first, buy array is ordered with highest price first', () => {
        matcher.match(buy1Account1);
        matcher.match(buy2Account1);

        expect(matcher.buyOrders[0]).toBe(buy2Account1);
        expect(matcher.getPrivateOrders(1).buyOrders[0]).toEqual(buy2Account1);
    });

    it('Given two sell orders from the same account, private orderbook is ordered with most recent first, sell array is ordered with lowest price first', () => {
        matcher.match(sell1Account1);
        matcher.match(sell2Account1);

        expect(matcher.sellOrders[0]).toBe(sell1Account1);
        expect(matcher.getPrivateOrders(1).sellOrders[1]).toEqual(sell2Account1);
    });

    it('Given two matching orders from the same account and a new order from a different account, trade will take place and ammend private order books effectively', () => {
        matcher.match(order(2, 10, 10, 1, 'Sell'));
        matcher.match(order(2, 10, 10, 2, 'Buy'));
        matcher.match(order(1, 10, 10, 3, 'Buy'));

        expect(matcher.sellOrders.length).toBe(0);
        expect(matcher.getPrivateOrders(1).buyOrders.length).toBe(0);
        expect(matcher.getPrivateOrders(1).sellOrders.length).toBe(0);
        expect(matcher.getPrivateOrders(2).buyOrders.length).toBe(1);
    });

    it('Given two identical sell orders from one account, buy order will match the last order on private orderbook as trades still happen with oldest time first', () => {
        matcher.match(order(2, 10, 10, 1, 'Sell'));
        matcher.match(order(2, 10, 10, 2, 'Sell'));
        matcher.match(order(1, 10, 10, 3, 'Buy'));

        expect(matcher.sellOrders.length).toBe(1);
        expect(matcher.sellOrders[0].timePlaced).toBe(2);
        expect(matcher.getPrivateOrders(1).buyOrders.length).toBe(0);
        expect(matcher.getPrivateOrders(1).sellOrders.length).toBe(0);
        expect(matcher.getPrivateOrders(2).sellOrders.length).toBe(1);
    });
});
