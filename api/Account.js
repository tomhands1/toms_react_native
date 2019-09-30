import axios from 'axios';

import { login } from '../endpoints';

export const authenticateLogin = loginCredentials => axios
    .post(login, loginCredentials)
    .then(response => response.data);
