import fp from 'lodash/fp';

import * as actions from '../actions/Account';

const INITIAL_STATE = {
    user: {},
    loading: false,
    isLoggedIn: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.CHANGE_ACCOUNT:
            return fp.set('user.accountNumber', action.accountNumber)(state);
        case actions.LOGIN_STARTED:
            return fp.set('loading', true)(state);
        case actions.LOGIN_SUCCESS:
            return fp.flow(
                fp.set('loading', false),
                fp.set('isLoggedIn', true),
                fp.set('user', action.userInfo)
            )(state);
        case actions.LOGIN_ERROR:
            return fp.flow(
                fp.set('loading', false),
                fp.set('loadingError', action.message)
            )(state);
        case actions.LOGOUT:
            return fp.flow(
                fp.set('isLoggedIn', false),
                fp.set('user', {})
            )(state);
        default:
            return state;
    }
};
