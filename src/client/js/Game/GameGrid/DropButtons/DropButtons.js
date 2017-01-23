import React from 'react';
import DropButton from './DropButton/DropButton';

class DropButtons extends React.Component {

    getDropButtons() {
        return [0,1,2,3,4,5,6].map(i => (
            <DropButton key={i} colNumber={i} />
        ))
    }

    render() {
        return (
            <div className='dropButtons'>
                <div className='bgText'>Click here to drop</div>
                {this.getDropButtons()}
            </div>
        )
    }
}

export default DropButtons;