import fp from 'lodash';

const BUY = 'Buy';
const SELL = 'Sell';
const isBuy = (action) => action === BUY;

class Matcher {
    constructor() {
        this.buyOrders = [];
        this.sellOrders = [];
        this.tradesList = [];
    }

    homeArray(order) { return isBuy(order.action) ? this.buyOrders : this.sellOrders; }
    targetArray(order) { return isBuy(order.action) ? this.sellOrders : this.buyOrders; }

    match(order) {
        this.targetArray(order).length !== 0 ? this.trade(order) : this.homeArray(order).push(order) && this.homeArray(order).sort(this.sortOrders);
    }

    sortOrders(a, b) {
        if (a.price === b.price) { return a.timePlaced - b.timePlaced; }
        return isBuy(a.action) ? b.price - a.price : a.price - b.price;
    }

    trade(order) {
        for (let i = 0; i < this.targetArray(order).length; i++) {
            if (order.accountNumber !== this.targetArray(order)[i].accountNumber) {
                const tradeOrder = this.targetArray(order)[i];
                const targetPrice = tradeOrder.price;
                let tradeQuantity = tradeOrder.quantity;
                const bestMatch = isBuy(order.action) ? order.price >= targetPrice : order.price <= targetPrice;
                if (bestMatch) {
                    if (order.quantity > tradeQuantity) {
                        this.printTrade(order, tradeOrder);
                        order.quantity -= tradeQuantity;
                        fp.remove(this.targetArray(order), tradeOrder);
                        i -= 1;
                    } else if (order.quantity < tradeQuantity) {
                        this.printTrade(order, tradeOrder);
                        this.targetArray(order)[i].quantity -= order.quantity;
                        return;
                    } else {
                        this.printTrade(order, tradeOrder);
                        fp.remove(this.targetArray(order), tradeOrder);
                        return;
                    }
                }
            }
        }
        this.homeArray(order).push(order);
        this.homeArray(order).sort(this.sortOrders);
    }

    printTrade(a, b) {
        const price = isBuy(a.action) ? b.price : a.price;
        const buyer = isBuy(a.action) ? a.accountNumber : b.accountNumber;
        const seller = isBuy(a.action) ? b.accountNumber : a.accountNumber;
        const quantity = Math.min(a.quantity, b.quantity);
        const currentTrade = {
            price,
            buyer,
            seller,
            date: new Date(),
            quantity,
        };
        this.tradesList.unshift(currentTrade);
    }

    getAllOrders() {
        const allOrders = {
            buyOrders: this.buyOrders,
            sellOrders: this.sellOrders,
        };
        return allOrders;
    }

    getPrivateOrders(user) { return { buyOrders: this.getPrivateBuyOrders(user), sellOrders: this.getPrivateSellOrders(user) }; }

    getPrivateBuyOrders(user) { return this.buyOrders.filter(x => x.accountNumber === user); }
    getPrivateSellOrders(user) { return this.sellOrders.filter(x => x.accountNumber === user); }

    getDepth(aggregation, action) {
        const depthMap = isBuy(action) ? this.getBuysDepth(aggregation) : this.getSellsDepth(aggregation);
        const depth = [];
        depthMap.forEach((key, value) => {
            depth.push({ price: value, quantity: key });
        });
        return isBuy(action) ? depth.reverse() : depth;
    }

    getBuysDepth(aggregation) {
        let buysDepth = new Map();
        const buyOrders = this.buyOrders;
        for (let i = 0; i < buyOrders.length; i++) {
            const reduceOrders = (aggregatedTotal, currentOrder, reducerIndex) => {
                return reducerIndex <= i ?
                    aggregatedTotal + Number(currentOrder.quantity) :
                    aggregatedTotal;
            };
            const price = Number(buyOrders[i].price);
            const mod = price % aggregation;
            const bottomRange = price - mod;
            const currentQuantity = buysDepth.get(bottomRange) || 0;
            const newQuantity = currentQuantity + buyOrders.reduce(reduceOrders, -currentQuantity);
            buysDepth.set(bottomRange, newQuantity);
        }
        return buysDepth;
    }

    getSellsDepth(aggregation) {
        let sellsDepth = new Map();
        const sellOrders = this.sellOrders;
        for (let i = 0; i < sellOrders.length; i++) {
            const price = Number(sellOrders[i].price);
            const mod = price % aggregation;
            const bottomRange = price - mod;
            const currentQuantity = sellsDepth.get(bottomRange) || 0;
            const reduceOrders = (aggregatedTotal, currentOrder, reducerIndex) => {
                return reducerIndex <= i ?
                    aggregatedTotal + Number(currentOrder.quantity) :
                    aggregatedTotal;
            };
            const newQuantity = currentQuantity + sellOrders.reduce(reduceOrders, (-currentQuantity));
            sellsDepth.set(bottomRange, newQuantity);
        }
        return sellsDepth;
    }
}

module.exports = Matcher;
