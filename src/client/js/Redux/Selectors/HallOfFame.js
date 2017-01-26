import { createSelector } from 'reselect';

export const isLoading = state => state.HallOfFame.isLoading;

export const loadFailed = state => state.HallOfFame.loadFailed;

export const pages = state => state.HallOfFame.pages;

export const currentPage = state => state.HallOfFame.currentPage;

const hallOfFamePlayers = state => state.HallOfFame.players

export const playerList = createSelector(
    [hallOfFamePlayers, currentPage],
    (players, page) => {
        const startIndex = 10 * (page - 1);
        return players.slice(startIndex, startIndex + 10);
    }
)
