const Order = (accountNumber, price, quantity, timePlaced, action) => {
    return {
        accountNumber,
        price,
        quantity,
        timePlaced: timePlaced || new Date(),
        action,
    };
};

export default Order;
