import { players } from '../Selectors/Game';
import {gameResultSaveSent, gameResultSaveFailed, gameResultSaveSucceeded} from '../ActionCreators/Server';

let prevState;

export default store => store.subscribe(() => {

  const playerState = players(store.getState());

  playerState.forEach((player, i) => {
      if (prevState && prevState[i].wins !== player.wins) {
          // set prevState here when we match or we get into an infinite loop of dispatches
          prevState = playerState;

          // dispatch async actions to server
          store.dispatch(gameResultSaveSent());

          setTimeout(() => store.dispatch(gameResultSaveFailed()), 1000);
      }
  });

  prevState = playerState;
});