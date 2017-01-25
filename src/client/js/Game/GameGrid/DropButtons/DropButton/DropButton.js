import React from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { tokenPlayed } from '../../../../Redux/ActionCreators/Game';
import { nextToken } from '../../../../Redux/Selectors/Game';

class DropButton extends React.Component {
    render() {        
        const classes = classnames('dropButton', this.props.nextToken);

        return (
            <div className={classes} onClick={() => this.props.tokenPlayed(this.props.colNumber)}>
            </div>
        )
    }
}

DropButton.propTypes = {
    nextToken: React.PropTypes.string.isRequired,
    tokenPlayed: React.PropTypes.func.isRequired
}

export default connect(
    state => ({
        nextToken: nextToken(state)
    }), 
    {
        tokenPlayed
    }
)(DropButton);