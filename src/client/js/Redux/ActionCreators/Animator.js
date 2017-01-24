import * as actions from '../Actions';

export const toggleAnimation = (animate, msg) => ({
    type: animate ? actions.START_ANIMATION : actions.STOP_ANIMATION,
    payload: {
        msg
    }
});

export const nextAnimationStep = () => ({
    type: actions.ANIMATION_NEXT_FRAME
});