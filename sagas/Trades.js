import { put, takeEvery, all, call } from 'redux-saga/effects';

import * as actions from '../actions/Trades';
import * as api from '../api/Trades';

function* fetchAllTrades() {
    try {
        const trades = yield call(api.fetchAllTrades);
        yield put(actions.fetchTradesSuccess(trades));
    }
    catch (error) {
        yield put(actions.fetchTradesError(error));
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(
            actions.FETCH_TRADES_STARTED,
            fetchAllTrades,
        )
    ]);
}
