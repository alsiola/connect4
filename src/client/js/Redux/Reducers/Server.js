import * as actions from '../Actions';
import update from 'immutability-helper';

const defaultState = {
    gameResultSaveInProgress: false,
    gameResultSaveError: false,
    gameResultSaveSuccess: false
}

export default function Server(state = defaultState, action) {
    switch (action.type) {
        case actions.GAME_RESULT_SAVE_SENT:
            return update(
                defaultState,
                {
                    gameResultSaveInProgress: {
                        $set: true
                    }
                }
            );
        case actions.GAME_RESULT_SAVE_FAILED:
            return update(
                defaultState,
                {
                    gameResultSaveError: {
                        $set: true
                    }
                }
            );
        case actions.GAME_RESULT_SAVE_SUCCEEDED:
            return update(
                defaultState,
                {
                    gameResultSaveSuccess: {
                        $set: true
                    }
                }
            );
        default:
            return state;
    }
}