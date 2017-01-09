import React from 'react';
import styles from './App.css';

export default class App extends React.Component {    
    render() {
        return (
            <div className={styles.yellow}>This is a react app sending the following message... {this.props.message}</div>
        );
    }
}