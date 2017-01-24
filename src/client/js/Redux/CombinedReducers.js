import {combineReducers} from 'redux';
import Game from './Reducers/Game';
import Server from './Reducers/Server';
import HallOfFame from './Reducers/HallOfFame';
import Animator from './Reducers/Animator';

const Reducer = combineReducers({
    Game,
    Server,
    HallOfFame,
    Animator
});

export default Reducer;