import React from 'react';
import {connect} from 'react-redux';
import {tokensInPlay as tokens} from '../../Redux/Selectors/Game';
import Column from './Column/Column';
import DropButtons from './DropButtons/DropButtons';

class GameGrid extends React.Component {

    getColumns() {
        return this.props.tokens.map((tokens, i) => (
            <Column key={i} colNumber={i} tokens={tokens} />
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

export default connect(state => ({
    tokens: tokens(state)
})
)(GameGrid);