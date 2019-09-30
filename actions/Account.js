export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

export const LOGIN_STARTED = 'LOGIN_STARTED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';

export const changeAccount = accountNumber => ({
    type: CHANGE_ACCOUNT,
    accountNumber,
});

export const loginStarted = loginCredentials => ({
    type: LOGIN_STARTED,
    loginCredentials
});

export const loginSuccess = userInfo => ({
    type: LOGIN_SUCCESS,
    userInfo
});

export const loginError = userInfo => ({
    type: LOGIN_ERROR,
    userInfo
});

export const logout = () => ({
    type: LOGOUT
});
