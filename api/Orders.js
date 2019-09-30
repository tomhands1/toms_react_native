import axios from 'axios';

import { newOrder, allOrders, depth } from '../endpoints';
import { adaptData } from '../adapters/Orders.js';

export const fetchAllOrders = () => axios
    .get(allOrders)
    .then(response => response.data)
    .then(adaptData);

export const fetchDepth = aggregation => axios
    .get(depth, { params: { aggregation: aggregation } })
    .then(response => response.data);


export const submitNewOrder = order => axios
    .post(newOrder, order)
    .then(response => response.data)
    .then(adaptData);
