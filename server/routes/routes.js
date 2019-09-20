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
        res.status(201).send(newOrder);
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

    app.get('/privateorders', (req, res) => {
        const user = req.query.user;
        const privateOrderbook = matcher.getPrivateOrders(user);
        res.status(200).send(privateOrderbook);
    });

};

module.exports = appRouter;
