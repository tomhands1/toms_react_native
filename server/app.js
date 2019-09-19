import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

routes(app);

const server = app.listen(3000, () => console.log('app running on port.', server.address().port));
