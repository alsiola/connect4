import React from 'react';
import {connect} from 'react-redux';
import {tokensInPlay as tokens} from '../../Redux/Selectors/Game';
import Column from './Column/Column';
import DropButtons from './DropButtons/DropButtons';

class GameGrid extends React.Component {

    getColumns() {
        return this.props.tokens.map((colTokens, i) => (
            <Column key={i} colNumber={i} tokens={colTokens} />
        ));
    }

    render() {
        return (
            <div className='inlineBlockCenter'>                      
                <DropButtons />
                <div className='gameGrid'>  
                    {this.getColumns()}
                </div>
            </div>
            
        )
    }
}

GameGrid.propTypes = {
    tokens: React.PropTypes.arrayOf(
        React.PropTypes.arrayOf(
            React.PropTypes.string
        )
    ).isRequired
}

export default connect(state => ({
    tokens: tokens(state)
})
)(GameGrid);