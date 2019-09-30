import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as actions from '../actions/Account';
import * as api from '../api/Account';

function* authenticateLogin({ loginCredentials }) {
    try {
        const userDetails = yield call(api.authenticateLogin, loginCredentials);
        yield put(actions.loginSuccess(userDetails));
    }
    catch (error) {
        yield put(actions.loginError(error));
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(
            actions.LOGIN_STARTED,
            authenticateLogin,
        )
    ]);
}
