import React from 'react';
import classnames from 'classnames';

class Token extends React.Component {
    render() {
        const classes = classnames(
            'gameToken',
             'position-' + this.props.position,
             this.props.colour,
             {
                 winner: this.props.isWinner
             }
        );

        return (
            <div className={classes}>
            </div>
        );
    }
}

Token.propTypes = {
    colour: React.PropTypes.string.isRequired,
    isWinner: React.PropTypes.bool,
    position: React.PropTypes.number
}

export default Token;