import Matcher from '../matcher';
import order from '../Order';

const appRouter = (app) => {

    const matcher = new Matcher();

    app.get('/', function (req, res) {
        res.status(200).send('Welcome to the mobile BitCoin Trader');
    });

    app.post('/order', function (req, res) {
        const requestBody = req.body;
        const { accountNumber, price, quantity, action } = requestBody;

        if ((accountNumber || price || quantity || action) === undefined) {
            res.status(400).send();
        }

        const newOrder = order(accountNumber, price, quantity, undefined, action);
        matcher.match(newOrder);
        res.status(201).send(matcher.getAllOrders());
    });

    app.post('/login', function (req, res) {
        const requestBody = req.body;
        const { username, password } = requestBody;
        console.log(requestBody);

        if ((username || password) === undefined) {
            res.status(400).send();
        }

        const userDetails = { accountNumber: '1', username: 'bob', balance: 205.00, preferredCurrency: '£' };
        res.status(201).send(userDetails);
    });

    app.get('/orders', (req, res) => {
        const user = req.query.user;
        user ?
            res.status(200).send(matcher.getPrivateOrders(user)) :
            res.status(200).send(matcher.getAllOrders());
    });

    app.get('/tradehistory', (req, res) => {
        res.status(200).send(matcher.tradesList);
    });

    app.get('/depth', (req, res) => {
        const aggregation = req.query.aggregation;
        const buysDepth = matcher.getDepth(aggregation, 'Buy');
        const sellsDepth = matcher.getDepth(aggregation, 'Sell');
        const depth = { buysDepth, sellsDepth };
        res.status(200).send(depth);
    });

};

module.exports = appRouter;
