import axios from 'axios';

import { allTrades } from '../endpoints';
import { adaptData } from '../adapters/Trades.js';

export const fetchAllTrades = () => axios
    .get(allTrades)
    .then(response => response.data)
    .then(adaptData);
