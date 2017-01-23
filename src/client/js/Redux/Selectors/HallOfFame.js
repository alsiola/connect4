export const isLoading = state => state.HallOfFame.isLoading;

export const loadFailed = state => state.HallOfFame.loadFailed;

export const pages = state => state.HallOfFame.pages;

export const currentPage = state => state.HallOfFame.currentPage;

export const playerList = state => {
    const startIndex = 10 * (currentPage(state) - 1);
    const endIndex = startIndex + 10;
    return state.HallOfFame.players.slice(startIndex, endIndex);
}
