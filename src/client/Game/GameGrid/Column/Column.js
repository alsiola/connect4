import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Token from './Token/Token';
import { connect } from 'react-redux';
import { winningTokens } from '../../../Redux/Selectors/Game';

class Column extends React.Component {
    isWinningToken(position) {
        return this.props.winningTokens && this.props.winningTokens.filter(token => {
            return token.colNumber === this.props.colNumber && position === token.position
        }).length > 0;
    }

    getTokens() {
        return this.props.tokens.map((colour, i) => (
            <Token key={i} colour={colour} isWinner={this.isWinningToken(i)} />
        ));
    }

    render() {
        return (
            <div className='gameColumn'>
                <ReactCSSTransitionGroup 
                    transitionName='gameToken' 
                    transitionEnterTimeout={500} 
                    transitionLeaveTimeout={1000}
                >
                    {this.getTokens().reverse()}            
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}

export default connect(state => ({
    winningTokens: winningTokens(state)
}),
{}
)(Column);