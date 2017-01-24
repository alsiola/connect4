export const getNameFromColour = (colour, players) => colour === 'red' ? players[0].name : players[1].name;

export const tokensInPlay = state => state.Animator.animating ? state.Animator.currentFrame : state.Game.tokensInPlay;

export const winner = state => state.Game.winner.colour;

export const winningTokens = state => state.Game.winner.tokens;

export const winningPlayer = state => getNameFromColour(state.Game.winner.colour, state.Game.players);

export const nextToken = state => state.Game.nextToken;

export const nextPlayer = state => getNameFromColour(state.Game.nextToken, state.Game.players);

export const players = state => state.Game.players;