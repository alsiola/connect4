import React from 'react';

export default class App extends React.Component {    
    render() {
        return (
            <div>This is a react app sending the following message... {this.props.message}</div>
        );
    }
}