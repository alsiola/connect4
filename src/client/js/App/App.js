import React from 'react';
import Game from '../Game/Game';
import {Provider} from 'react-redux';
import store from '../Redux/Store';
import { Grid, PageHeader } from 'react-bootstrap';
import WinningPlayerSaver from '../Redux/Subscribers/WinningPlayerSaver';
import AppNotifier from './AppNotifier';

export default class App extends React.Component {
    componentDidMount() {
        WinningPlayerSaver(store);
    }

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