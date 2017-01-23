import React from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { playerList } from '../../Redux/Selectors/HallOfFame';

class PlayerList extends React.Component {
    getPlayerRows() {
        return this.props.playerList.map((player, i) => {
            const winRate = (100 * player.wins / player.totalGames).toFixed(1);

            return (
                <tr key={i}>
                    <td>{player.rank}</td>
                    <td>{player.name}</td>
                    <td>{player.totalGames}</td>
                    <td>{winRate}%</td>
                    <td>{player.wins}</td>
                </tr>
            )
        });
    }

    render() {
        return (
            <Table striped bordered condensed>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Games</th>
                        <th>Win Rate</th>
                        <th>Total Wins</th>
                    </tr>
                </thead>
                <tbody>                    
                    {this.getPlayerRows()}
                </tbody>
            </Table>
        )
    }
}

PlayerList.propTypes = {
    playerList: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            name: React.PropTypes.string,
            wins: React.PropTypes.number,
            rank: React.PropTypes.number,
            totalGames: React.PropTypes.number
        })
    ) 
}

export default connect(
    state => ({
        playerList: playerList(state)
    }),
    {}
)(PlayerList);