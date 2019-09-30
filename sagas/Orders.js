import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';

import * as actions from '../actions/Orders';
import * as api from '../api/Orders';

function* fetchAllOrders() {
    try {
        const orders = yield call(api.fetchAllOrders);
        yield put(actions.fetchOrdersSuccess(orders));
    }
    catch (error) {
        yield put(actions.fetchOrdersError(error));
    }
}

function* submitNewOrder(action) {
    try {
        const orders = yield call(api.submitNewOrder, action.order);
        yield put(actions.addOrderSuccess(orders));
    }
    catch (error) {
        yield put(actions.addOrderFailure(error));
    }
}

function* fetchDepth({ aggregation }) {
    try {
        const depth = yield call(api.fetchDepth, aggregation);
        yield put(actions.updateDepth(depth));
    }
    catch (error) {
        yield put(actions.updateDepthError(error));
    }
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(
            actions.ADD_ORDER_STARTED,
            submitNewOrder,
        ),
        yield takeEvery(
            actions.FETCH_ORDERS_STARTED,
            fetchAllOrders,
        ),
        yield takeLatest(
            actions.UPDATE_AGGREGATION,
            fetchDepth,
        )
    ]);
}
