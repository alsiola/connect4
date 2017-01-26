import { players } from '../Selectors/Game';
import {gameResultSaveSent, gameResultSaveFailed, gameResultSaveSucceeded} from '../ActionCreators/Server';
import Api from '../../Api/Api';

export default store => next => action => {

    const prevPlayerState = players(store.getState());
    const result = next(action);
    const resultPlayerState = players(store.getState());


    prevPlayerState.forEach((player, i, players) => {
        if (resultPlayerState[i].wins !== player.wins) {
            const winnerName = player.name;
            const loserName = i === 0 ? players[1].name : players[0].name;

            store.dispatch(gameResultSaveSent());

            Api.saveResult(winnerName, loserName)
            .then(response => {
                if (response.data.success) {
                    store.dispatch(gameResultSaveSucceeded());                    
                } else {
                    store.dispatch(gameResultSaveFailed());
                }
            })
            .catch(() => {
                store.dispatch(gameResultSaveFailed());
            });
        }
    });
    
    return result;
};