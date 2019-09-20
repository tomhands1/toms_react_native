export const CHANGE_ACCOUNT = 'CHANGE_ACCOUNT';

export const changeAccount = accountNumber => ({
    type: CHANGE_ACCOUNT,
    accountNumber,
});
