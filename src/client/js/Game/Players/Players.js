import React from 'react';
import { Panel, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { players } from '../../Redux/Selectors/Game';
import NameChangeModal from './NameChangeModal';

class Players extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: true
        };
    }

    setModalOpen(isOpen) {
        this.setState({
            showModal: isOpen
        })
    }

    getPlayerRows() {
        return this.props.players.map((player, i) => (
            <tr key={i}>
                <td>{player.name}</td>
                <td>{player.wins}</td>
            </tr>
        ));
    }

    render() {
        return (
            <Panel header='Players' bsStyle='primary'>
                <Table striped bordered condensed>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Session Wins</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.getPlayerRows()}
                    </tbody>
                </Table>               

                <NameChangeModal show={this.state.showModal} hide={() => this.setModalOpen(false)} />

                <Button onClick={() => this.setModalOpen(true)}>Change Names</Button>
            </Panel>
        )
    }
}

Players.propTypes = {
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
{}
)(Players);

