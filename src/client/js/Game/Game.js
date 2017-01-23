import React from 'react';
import GameStatus from './GameStatus/GameStatus';
import Controls from './Controls/Controls';
import GameGrid from './GameGrid/GameGrid';
import Players from './Players/Players';
import { Row, Col } from 'react-bootstrap';

class Game extends React.Component {
    render() {
        return (
            <Row>
                <Col xs={4}>
                        <Players />
                        <Controls />   
                        <GameStatus />  
                </Col>
                <Col xs={8} className='text-center'>
                    <GameGrid />
                </Col>
            </Row>
        )
    }
}

export default Game;