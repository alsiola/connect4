import * as actions from '../Actions';
import update from 'immutability-helper';
import CheckForWinner from './Utils/CheckForWinner';

update.extend('$setWins', (wins, players) => {
    return players.slice().map(player => {
        player.wins = wins;
        return player;
    })
});

export default function Game(state = defaultState, action) {
    switch (action.type) {
        case actions.TOKEN_PLAYED:
            if (state.tokensInPlay[action.payload.colNumber].length >= 7 || state.winner.colour) return state;

            const updatedTokens = update(
                state.tokensInPlay,
                {
                    [action.payload.colNumber]: {
                        $push: getNextToken(state.tokensInPlay)
                    }
                }
            );

            const winner = CheckForWinner(updatedTokens, state.players);

            let updatedPlayers = state.players.slice();

            if (winner.colour) {
                updatedPlayers = update(
                    state.players,
                    {
                        [winner.colour === 'red' ? 0 : 1]: {
                            wins: {
                                $apply: currentWins => currentWins + 1
                            }
                        }
                    }
                )
            }
            
            return update(
                state,
                {
                    tokensInPlay: {
                        $set: updatedTokens
                    },
                    winner: {
                        $set: winner
                    },
                    nextToken: {
                        $set: getNextToken(updatedTokens)
                    },
                    players: {
                        $set: updatedPlayers
                    }
                }
            );
        case actions.RESET_GAME:
            return update(
                state,
                {
                    tokensInPlay : {
                        $set: defaultState.tokensInPlay
                    },
                    winner: {
                        $set: defaultState.winner
                    },
                    nextToken: {
                        $set: defaultState.nextToken
                    }
                }
            );
        case actions.PLAYER_NAME_CHANGED:
            return update(
                state,
                {
                    players: {
                        [action.payload.playerNumber]: {
                            name: {
                                $set: action.payload.newName
                            }
                        }
                    }
                }
            );
        case actions.RESET_SCORES:
            return update(
                state,
                {
                    players: {
                        $setWins: 0
                    }
                }
            )
        default:
            return state;
    }
}



const getNextToken = tokens => {
    return tokens.reduce((total, column) => {
        return total + column.length;
    }, 0) % 2 === 0 ? ['red'] : ['yellow'];
}

const defaultState = {
    tokensInPlay: [
        [],[],[],[],[],[],[]
    ],
    winner: {},
    nextToken: 'red',
    players: [
        {
            name:'Player 1',
            wins: 0
        },
        {
            name:'Player 2',
            wins: 0
        }
    ]
}