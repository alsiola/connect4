import {createStore, applyMiddleware, compose} from 'redux';
import winningPlayerSaverMiddleware from './Middleware/winningPlayerSaverMiddleware';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import CombinedReducers from './CombinedReducers';

const logger = createLogger();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    CombinedReducers,
    composeEnhancers(
        applyMiddleware(thunk, winningPlayerSaverMiddleware, logger)
    )
);

export default store