import * as actions from '../Actions';
import GetWordAsTokenArray from './Utils/GetWordAsTokenArray'
import update from 'immutability-helper';

const defaultState = {
    animating: false,
    animationColumns:[],
    currentFrame:[],
    nextFrameLeftmostColumn: 0
};

export default function Animator(state = defaultState, action) {
    switch (action.type) {
        case actions.START_ANIMATION:

            return update(
                state,
                {
                    animating: {
                        $set: true
                    },
                    animationColumns: {
                        $set: GetWordAsTokenArray(action.payload.msg)
                    }
                }
            );
        case actions.STOP_ANIMATION:
            return update(
                state,
                {
                    animating: {
                        $set: false
                    }
                }
            );
        case actions.ANIMATION_NEXT_FRAME:
            const { nextFrameLeftmostColumn, animationColumns } = state;
            return update(
                state,
                {
                    currentFrame: {
                        $set: getNextFrame(animationColumns, nextFrameLeftmostColumn)
                    },
                    nextFrameLeftmostColumn: {
                        $apply: nflc => ++nflc
                    }
                }
            )
        default:
            return state;
    }
}

const getNextFrame = (cols, leftmostColNum) => {
    const nextFrame = [];

    for(let i = leftmostColNum; i < leftmostColNum + 7; i++) {
        const absI = i % cols.length;
        if (absI < cols.length) {
            nextFrame.push(cols[absI]);
        } else {
            nextFrame.push(allredColumn)
        }
    }

    return nextFrame;
}

const allredColumn = ['red','red','red','red','red','red'];