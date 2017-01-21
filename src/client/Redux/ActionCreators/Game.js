import * as actions from '../Actions';

export const tokenPlayed = (colNumber, colour) => ({
    type: actions.TOKEN_PLAYED,
    payload: {
        colNumber,
        colour
    }
});

export const resetGame = () =>({
    type: actions.RESET_GAME
});

export const changePlayerName = (playerNumber, newName) => ({
    type: actions.PLAYER_NAME_CHANGED,
    payload: {
        playerNumber,
        newName
    }
});

export const resetScores = () => ({
    type: actions.RESET_SCORES
});