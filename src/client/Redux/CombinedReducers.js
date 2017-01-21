import {combineReducers} from 'redux';
import Game from './Reducers/Game';
import Server from './Reducers/Server';

const Reducer = combineReducers({
    Game,
    Server
});

export default Reducer;