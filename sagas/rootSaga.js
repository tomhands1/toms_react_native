import { all } from 'redux-saga/effects';
import orders from './Orders';
import trades from './Trades';
import account from './Account';

export default function* rootSaga() {
    yield all([
        orders(),
        trades(),
        account()
    ]);
}
