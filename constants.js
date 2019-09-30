export const ordersColumns = [
    {
        id: 'price',
        title: 'Price',
        format: x => `£${x}`
    },
    {
        id: 'quantity',
        title: 'Quantity'
    },
    {
        id: 'timePlaced',
        title: 'Placed at'
    }
];

export const tradeColumns = [
    {
        id: 'buyer',
        title: 'Buyer'
    },
    {
        id: 'seller',
        title: 'Seller'
    },
    {
        id: 'price',
        title: 'Price',
        format: x => `£${x}`
    },
    {
        id: 'quantity',
        title: 'Quantity'
    },
    {
        id: 'date',
        title: 'Traded at'
    }
];
