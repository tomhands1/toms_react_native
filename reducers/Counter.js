import * as actions from '../actions/Counter';

const INITIAL_STATE = {
    count: 0,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.INCREASE_COUNT:
            return {
                count: state.count + 1,
            };
        case actions.DECREASE_COUNT:
            return {
                count: state.count - 1,
            };
        case actions.RESET_COUNT:
            return {
                count: 0,
            };
        default:
            return state;
    }
};
