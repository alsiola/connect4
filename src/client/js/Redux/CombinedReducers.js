import {combineReducers} from 'redux';
import Game from './Reducers/Game';
import Server from './Reducers/Server';
import HallOfFame from './Reducers/HallOfFame';

const Reducer = combineReducers({
    Game,
    Server,
    HallOfFame
});

export default Reducer;