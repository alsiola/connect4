import React from 'react';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';
import { players } from '../../Redux/Selectors/Game';

class Players extends React.Component {
    render() {
        return (
            <Panel header='Players' bsStyle='primary'>
                {this.props.players.map((player, i) => (
                    <div key={i}>{player.name} ({player.wins} wins)</div>
                ))}
            </Panel>
        )
    }
}

export default connect(state => ({
    players: players(state)
}),
{}
)(Players);

