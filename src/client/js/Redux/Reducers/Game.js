import * as actions from '../Actions';
import update from 'immutability-helper';
import CheckForWinner from './Utils/CheckForWinner';

update.extend('$setWins', (wins, players) => {
    return players.slice().map(player => {
        player.wins = wins;
        return player;
    })
});

const getNextToken = prevToken => {
    return prevToken === 'red' ? 'yellow' : 'red';
}

const defaultState = {
    tokensInPlay: [
        [],[],[],[],[],[],[]
    ],
    winner: {},
    nextToken: 'red',
    players: [
        {
            name:'',
            wins: 0
        },
        {
            name:'',
            wins: 0
        }
    ]
}

export default function Game(state = defaultState, action) {
    switch (action.type) {
        case actions.TOKEN_PLAYED:
            if (state.tokensInPlay[action.payload.colNumber].length >= 6 || state.winner.colour) return state;

            const updatedTokens = update(
                state.tokensInPlay,
                {
                    [action.payload.colNumber]: {
                        $push: [state.nextToken]
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
                        $set: getNextToken(state.nextToken)
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