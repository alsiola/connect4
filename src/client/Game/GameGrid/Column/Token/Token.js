import React from 'react';

class Token extends React.Component {

    render() {
        const className = 'gameToken ' + this.props.colour + (this.props.isWinner ? ' winner' : '');
        return (
            <div className={className}>
            </div>
        );
    }
}

export default Token;