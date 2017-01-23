import * as actions from '../Actions';

export const gameResultSaveSent = () => ({
    type: actions.GAME_RESULT_SAVE_SENT
});

export const gameResultSaveFailed = () => ({
    type: actions.GAME_RESULT_SAVE_FAILED
});

export const gameResultSaveSucceeded = () => ({
    type: actions.GAME_RESULT_SAVE_SUCCEEDED
});