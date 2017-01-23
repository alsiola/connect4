import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { players } from '../../Redux/Selectors/Game';
import { changePlayerName } from '../../Redux/ActionCreators/Game';
import NameChangeFormGroup from './NameChangeFormGroup';

class NameChangeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player1: props.players[0].name,
            player2: props.players[1].name,
            error: true,
            initialSet: true
        }
    }

    inputChanged(playerNumber, event) {
        // Use callback of setState function so we can access the new value of state

        this.setState({
            ['player' + playerNumber]: event.target.value
        }, () => {
            this.setState({                
                error: !this.isValidInput(1) || !this.isValidInput(2)
            })
        });
    }

    isValidInput(playerNumber) {
        const inputLength = this.state['player' + playerNumber].length
        return inputLength > 2 && inputLength < 13;
    }

    getValidationState(playerNumber) {
        return this.isValidInput(playerNumber) ? 'success' : 'error';
    }

    saveNames() {
        if (!this.state.error) {
            this.props.changePlayerName(0, this.state.player1);
            this.props.changePlayerName(1, this.state.player2);
            this.props.hide();
            this.setState({
                initialSet: false
            })
        }
    }

    buttonKeyPress(target) {
        // Use enter key to save as well as button
        if (target.charCode === 13) {
            this.saveNames();
        }
    }

    render() {
        return (
            <Modal 
                backdrop={this.state.initialSet ? 'static' : true}
                keyboard={!this.state.initialSet}
                show={this.props.show} 
                onHide={() => this.props.hide()} 
                onKeyPress={t => this.buttonKeyPress(t)}
            >
                <Modal.Header closeButton={!this.state.initialSet}>
                    <Modal.Title>{this.state.initialSet ? 'Connect4' : 'Set Player Names'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.initialSet &&
                        <h5>Welcome to Connect4, please enter your names and we'll start the game!</h5>    
                    }
                    <NameChangeFormGroup
                        label='Player 1'
                        getValidationState={() => this.getValidationState(1)}
                        value={this.state.player1}
                        inputChanged={ e => this.inputChanged(1, e)}
                    />
                    <NameChangeFormGroup
                        label='Player 2'
                        getValidationState={() => this.getValidationState(2)}
                        value={this.state.player2}
                        inputChanged={ e => this.inputChanged(2, e)}
                    />
                    <Button disabled={this.state.error} onClick={() => this.saveNames()}>Save</Button>
                </Modal.Body>
            </Modal>

        )
    }
}

NameChangeModal.propTypes = {
    show: React.PropTypes.bool.isRequired,
    hide: React.PropTypes.func.isRequired,
    players: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string,
            wins: React.PropTypes.number
        })
    )
}

export default connect(state => ({
    players: players(state)
}),
{
    changePlayerName
}
)(NameChangeModal);