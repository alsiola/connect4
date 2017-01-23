import * as actions from '../Actions';
import Api from '../../Api/Api';

export const changePage = ({ page }) => ({
    type: actions.HALL_OF_FAME_PAGE_CHANGED,
    payload: {
        page
    }
});

export const loadHallOfFameData = () => dispatch => {
    dispatch(hallOfFameLoadSent());

    Api.loadHallOfFameData()
        .then(response => dispatch(hallOfFameLoadSucceeded(response.data)))
        .catch(err => dispatch(hallOfFameLoadFailed()));
};

const hallOfFameLoadSent = () => ({
    type: actions.HALL_OF_FAME_LOAD_SENT
});

const hallOfFameLoadSucceeded = ({ players, pages }) => ({
    type: actions.HALL_OF_FAME_LOAD_SUCCEEDED,
    payload: {
        players,
        pages
    }
});

const hallOfFameLoadFailed = () => ({
    type: actions.HALL_OF_FAME_LOAD_FAILED
});