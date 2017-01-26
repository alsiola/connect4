import { createSelector } from 'reselect';
import { isAnimating, currentFrame } from './Animator';

export const getNameFromColour = (colour, players) => colour === 'red' ? players[0].name : players[1].name;

export const gameTokens = state => state.Game.tokensInPlay;

export const tokensInPlay = createSelector(
    [isAnimating, currentFrame, gameTokens],
    (isAnimating, currentFrame, gameTokens) => {
        return isAnimating ? currentFrame : gameTokens
    }
)

export const winner = state => state.Game.winner.colour;

export const nextToken = state => state.Game.nextToken;

export const players = state => state.Game.players;

export const winningTokens = state => state.Game.winner.tokens;

export const winningPlayer = createSelector(
    [winner, players],
    (winningColour, players) => {
        return getNameFromColour(winningColour, players);
    }
)

export const nextPlayer = createSelector(
    [nextToken, players],
    (colour, players) => {
        return getNameFromColour(colour, players);
    }
)