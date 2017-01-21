import React from 'react';
import { connect } from 'react-redux';
import { winner, nextToken, winningPlayer, nextPlayer } from '../../Redux/Selectors/Game';
import Token from '../GameGrid/Column/Token/Token';
import { Panel } from 'react-bootstrap';

class GameStatus extends React.Component {
    render() {
        return (
            <Panel header='Game status' bsStyle="primary">
                {this.props.winner && 
                    <span>The winner is {this.props.winningPlayer} ({this.props.winner})</span>    
                }
                {!this.props.winner &&
                    <div>Next to play is {this.props.nextPlayer} <Token colour={this.props.nextToken} /></div>    
                }
            </Panel>
        )
    }
}


export default connect(state => ({
    winner: winner(state),
    winningPlayer: winningPlayer(state),
    nextToken: nextToken(state),
    nextPlayer: nextPlayer(state)
}),
{}
)(GameStatus);