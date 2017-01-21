import React from 'react';
import {connect} from 'react-redux';
import { tokenPlayed } from '../../../../Redux/ActionCreators/Game';
import { nextToken } from '../../../../Redux/Selectors/Game';

class DropButton extends React.Component {
    render() {        
        const className = 'dropButton ' + this.props.nextToken;

        return (
            <div className={className} onClick={() => this.props.tokenPlayed(this.props.colNumber)}>
            </div>
        )
    }
}

export default connect(
    state => ({
        nextToken: nextToken(state)
    }), 
    {
        tokenPlayed
    }
)(DropButton);