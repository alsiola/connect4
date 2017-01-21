import React from 'react';
import { connect } from 'react-redux';
import { resetGame, resetScores } from '../../Redux/ActionCreators/Game';
import { Panel, ButtonToolbar, Button } from 'react-bootstrap';

class Controls extends React.Component {
    render() {
        return (
            <Panel header='Controls' bsStyle='primary'>
                <ButtonToolbar>
                    <Button onClick={() => this.props.resetGame()}>New Game</Button>
                    <Button onClick={() => this.props.resetScores()}>Reset Scores</Button>
                </ButtonToolbar>                
            </Panel>            
        )
    }
}

export default connect(null,
{
    resetGame,
    resetScores
})(Controls);