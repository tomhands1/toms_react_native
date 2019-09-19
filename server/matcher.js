import fp from 'lodash';

const BUY = 'Buy';
const isBuy = (order) => order.action === BUY;

class Matcher {
    constructor() {
        this.buyOrders = [];
        this.sellOrders = [];
        this.tradesList = [];
    }

    homeArray(order) { return isBuy(order) ? this.buyOrders : this.sellOrders; }
    targetArray(order) { return isBuy(order) ? this.sellOrders : this.buyOrders; }

    match(order) {
        this.targetArray(order).length !== 0 ? this.trade(order) : this.homeArray(order).push(order) && this.homeArray(order).sort(this.sortOrders);
    }

    sortOrders(a, b) {
        if (a.price === b.price) { return a.timePlaced - b.timePlaced; }
        return isBuy(a) ? b.price - a.price : a.price - b.price;
    }

    trade(order) {
        for (let i = 0; i < this.targetArray(order).length; i++) {
            if (order.accountNumber !== this.targetArray(order)[i].accountNumber) {
                const tradeOrder = this.targetArray(order)[i];
                const targetPrice = tradeOrder.price;
                let tradeQuantity = tradeOrder.quantity;
                const bestMatch = isBuy(order) ? order.price >= targetPrice : order.price <= targetPrice;
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
        const price = isBuy(a) ? b.price : a.price;
        const buyer = isBuy(a) ? a.accountNumber : b.accountNumber;
        const seller = isBuy(a) ? b.accountNumber : a.accountNumber;
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

}

module.exports = Matcher;

// const Trade = require("./Trade");
// const Order = require("./Order");

//     printTrade(a, b) {
//         const isBuy = a.action == "Buy";
//         const price = isBuy ? b.price : a.price;
//         const buyer = isBuy ? a.accountNumber : b.accountNumber;
//         const seller = isBuy ? b.accountNumber : a.accountNumber;
//         let currentTrade = new Trade(buyer, seller, Math.min(a.quantity, b.quantity), price, new Date(), (this.trades.length + 1));
//         this.trades.unshift(currentTrade);
//     }

//     getAllOrders() {
//         const orderbook = this.buy.concat(this.sell);
//         orderbook.sort((a, b) => {
//             return b.timePlaced - a.timePlaced;
//         });
//         return orderbook;
//     }

//     getPrivateOrders(num) {
//         const privateOrderbook = [];
//         const allOrders = this.getAllOrders();
//         for (let i = 0; i <= allOrders.length - 1; i++) {
//             if (allOrders[i].accountNumber == num) {
//                 privateOrderbook.push(allOrders[i]);
//             }
//         }
//         return privateOrderbook;
//     }

//     newAggregateBuys(range) {
//         let aggregatedBuys = new Map();
//         const buyOrders = this.buy;
//         for (let i = 0; i < buyOrders.length; i++) {
//             const reduceOrders = (aggregatedTotal, currentOrder, reducerIndex) => {
//                 return reducerIndex <= i ?
//                     aggregatedTotal + currentOrder.quantity :
//                     aggregatedTotal;
//             }
//             const price = buyOrders[i].price;
//             const mod = price % range;
//             const bottomRange = price - mod;
//             const currentQuantity = aggregatedBuys.get(bottomRange) || 0;
//             const newQuantity = currentQuantity + buyOrders.reduce(reduceOrders, -currentQuantity);
//             aggregatedBuys.set(bottomRange, newQuantity);
//         }
//         return aggregatedBuys;
//     }

//     reduceOrders(aggregatedTotal, currentOrder, reducerIndex, orderIndex) {
//         if (reducerIndex <= orderIndex) {
//             return aggregatedTotal + currentOrder.quantity;
//         }
//         return aggregatedTotal
//     }


//     newAggregateSells(range) {
//         let aggregatedSells = new Map();
//         const sellOrders = this.sell;
//         for (let i = 0; i < sellOrders.length; i++) {
//             const price = sellOrders[i].price;
//             const mod = price % range;
//             const bottomRange = price - mod;
//             const currentQuantity = aggregatedSells.get(bottomRange) || 0;
//             const reduceOrders = (aggregatedTotal, currentOrder, reducerIndex) => {
//                 return reducerIndex <= i ?
//                     aggregatedTotal + currentOrder.quantity :
//                     aggregatedTotal;
//             }
//             const newQuantity = currentQuantity + sellOrders.reduce(reduceOrders, (-currentQuantity));
//             aggregatedSells.set(bottomRange, newQuantity);
//         }
//         return aggregatedSells;
//     }

//     depthSells(range) {
//         const sellsDepth = [];
//         let map = this.newAggregateSells(range);
//         map.forEach((value, key) => {
//             sellsDepth.push({
//                 price: Number(key),
//                 quantity: value
//             })
//         })
//         return sellsDepth;
//     }

//     depthBuys(range) {
//         const buysDepth = [];
//         let map = this.newAggregateBuys(range);
//         map.forEach((value, key) => {
//             buysDepth.push({
//                 price: Number(key),
//                 quantity: value
//             })
//         })
//         return buysDepth;
//     }



//     getPrivateHistory(num) {
//         const privateHistory = [];
//         const allHistory = this.trades;

//         for (let i = 0; i < allHistory.length; i++) {
//             if (allHistory[i].buyer == num || allHistory[i].seller == num) {
//                 privateHistory.unshift(allHistory[i]);
//             }
//         }
//         return privateHistory;
//     }
// }
// module.exports = Matcher;
