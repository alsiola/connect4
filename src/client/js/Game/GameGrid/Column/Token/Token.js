import React from 'react';

class Token extends React.Component {
    render() {
        let className = 'gameToken ';
        className += this.props.colour + (this.props.isWinner ? ' winner ' : ' ');
        className += 'position-' + this.props.position;

        return (
            <div className={className}>
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