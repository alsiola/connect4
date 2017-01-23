import Game, { defaultState } from './Game';

describe('when a TOKEN_PLAYED action is received', () => {
    const tokenPlayedIntoColumnZeroAction = {
            type: 'TOKEN_PLAYED',
            payload: {
                colNumber: 0
            }
        }

    it('adds the token to the correct column', () => {
        const nextState = Game(defaultState, tokenPlayedIntoColumnZeroAction);

        expect(nextState.tokensInPlay[0][0]).toEqual('red');
    });

    it('only adds six tokens to a column', () => {
        let nextState = defaultState;

        for(var i = 0; i < 10; i++) {
            nextState = Game(nextState, tokenPlayedIntoColumnZeroAction);
        }

        expect(nextState.tokensInPlay[0].length).toEqual(6);
    });
})