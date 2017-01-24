import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { toggleAnimation, nextAnimationStep } from '../../Redux/ActionCreators/Animator';
import { currentFrame, isAnimating } from '../../Redux/Selectors/Animator';
import { players } from '../../Redux/Selectors/Game';

class AnimatorControl extends React.Component {
    startAnimation() {
        const msg = this.props.players[0].name + " vs " + this.props.players[1].name;
        this.props.toggleAnimation(!this.props.isAnimating, msg);
        this.triggerNextAnimationStep(true);
    }

    triggerNextAnimationStep(initial) {
        if (initial || this.props.isAnimating) {
            this.props.nextAnimationStep();
            setTimeout(() => {
                this.triggerNextAnimationStep(false);
            }, 80);
        }
    }

    render() {
        return (
            <Button onClick={() => this.startAnimation()}>
                {this.props.isAnimating ? 'Stop Animating' : 'Animate!'}
            </Button>
        )
    }
}

export default connect(state => ({
    currentFrame: currentFrame(state),
    isAnimating: isAnimating(state),
    players: players(state)
}),
{
    toggleAnimation,
    nextAnimationStep
})(AnimatorControl);