export const FETCH_TRADES_STARTED = 'FETCH_TRADES_STARTED';
export const FETCH_TRADES_SUCCESS = 'FETCH_TRADES_SUCCESS';
export const FETCH_TRADES_ERROR = 'FETCH_TRADES_ERROR';

export const fetchTradesStarted = () => ({
    type: FETCH_TRADES_STARTED
});

export const fetchTradesSuccess = trades => ({
    type: FETCH_TRADES_SUCCESS,
    trades
});

export const fetchTradesError = error => ({
    type: FETCH_TRADES_ERROR,
    error
});
