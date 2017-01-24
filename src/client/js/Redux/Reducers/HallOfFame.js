import * as actions from '../Actions';
import update from 'immutability-helper';

const defaultState = {
    players: [],
    pages: 0,
    isLoading: false,
    loadFailed: false,
    currentPage: 1
};

export default function Game(state = defaultState, action) {
    switch (action.type) {
        case actions.HALL_OF_FAME_LOAD_SENT:
            return Object.assign({},
                defaultState,
                {
                    isLoading: true
                }
            );
        case actions.HALL_OF_FAME_LOAD_FAILED:
            return Object.assign({},
                defaultState,
                {
                    loadFailed: true
                }
            );
        case actions.HALL_OF_FAME_LOAD_SUCCEEDED:
            const { players } = action.payload;
            return update(
                state,
                {
                    players: {
                        $set: players
                    },
                    pages: {
                        $set: Math.ceil(players.length / 10)
                    },
                    isLoading: {
                        $set: false
                    },
                    loadFailed: {
                        $set: false
                    }
                }
            )
        case actions.HALL_OF_FAME_PAGE_CHANGED:
            return update(
                state,
                {
                    currentPage: {
                        $set: action.payload.page
                    }
                }           
            )
        default:
            return state;
    }
}