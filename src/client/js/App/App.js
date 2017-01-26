import React from 'react';
import Game from '../Game/Game';
import {Provider} from 'react-redux';
import store from '../Redux/Store';
import { Grid, PageHeader } from 'react-bootstrap';
import AppNotifier from './AppNotifier';

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Grid>
                    <AppNotifier />
                    <PageHeader>Connect4 <small>A game by Alex Young</small></PageHeader>
                    <Game />
                </Grid>                            
            </Provider>
        );
    }
}