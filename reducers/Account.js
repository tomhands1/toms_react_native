import fp from 'lodash/fp';

import * as actions from '../actions/Account';

const INITIAL_STATE = {
    accountNumber: 1,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.CHANGE_ACCOUNT:
            return fp.set('accountNumber', action.accountNumber)(state);
        default:
            return state;
    }
};
