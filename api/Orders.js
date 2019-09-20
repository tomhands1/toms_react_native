import axios from 'axios';

import { newOrder, allOrders } from '../endpoints';

export const fetchAllOrders = () => axios
    .get(allOrders)
    .then(response => response.data);

export const submitNewOrder = order => axios
    .post(newOrder, order)
    .then(response => response.data);
