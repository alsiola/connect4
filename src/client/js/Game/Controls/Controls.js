import React from 'react';
import { connect } from 'react-redux';
import { resetGame, resetScores } from '../../Redux/ActionCreators/Game';
import { Panel, ButtonToolbar, Button } from 'react-bootstrap';
import HallOfFame from '../HallOfFame/HallOfFame';

class Controls extends React.Component {    
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }

    setModalOpen(isOpen) {
        this.setState({
            showModal: isOpen
        });
    }

    render() {
        return (
            <Panel header='Controls' bsStyle='primary'>
                <HallOfFame show={this.state.showModal} hide={() => this.setModalOpen(false)} />
                <ButtonToolbar>
                    <Button onClick={() => this.props.resetGame()}>New Game</Button>
                    <Button onClick={() => this.props.resetScores()}>Reset Scores</Button>
                </ButtonToolbar>
                <ButtonToolbar>
                    <Button onClick={() => this.setModalOpen(true)}>Hall Of Fame</Button>
                </ButtonToolbar>              
            </Panel>            
        )
    }
}

Controls.propTypes = {
    resetGame: React.PropTypes.func.isRequired,
    resetScores: React.PropTypes.func.isRequired
}

export default connect(null,
{
    resetGame,
    resetScores
})(Controls);