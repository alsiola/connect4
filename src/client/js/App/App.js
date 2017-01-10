import React from 'react';
import styles from './App.css';
import axios from 'axios';

export default class App extends React.Component {

    componentDidMount() {
        axios.get('/api/currentuser').then(response => {
            console.log(response.data);
        });
    }   

    render() {
        return (
            <div className={styles.yellow}>This is a react app sending the following message... {this.props.message}</div>
        );
    }
}