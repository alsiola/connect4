import { players } from '../Selectors/Game';
import {gameResultSaveSent, gameResultSaveFailed, gameResultSaveSucceeded} from '../ActionCreators/Server';
import Api from '../../Api/Api';

let prevState;

export default store => store.subscribe(() => {

    const state = store.getState();
    const playerState = players(state);

    playerState.forEach((player, i, players) => {
        if (prevState && prevState[i].wins !== player.wins) {
            // set prevState here when we match or we get into an infinite loop of dispatches
            // as when we dispatch our pre-request action it may complete and result in this function
            // being called again before we have finished executing this time 
            
            prevState = playerState;

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

    prevState = playerState;
});