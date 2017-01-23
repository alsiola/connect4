export const saveStatus = state => {
    const { gameResultSaveInProgress, gameResultSaveError, gameResultSaveSuccess } = state.Server;

    if (gameResultSaveInProgress) return 'IN_PROGRESS';
    if (gameResultSaveError) return 'ERROR';
    if (gameResultSaveSuccess) return 'SUCCESS';

    return 'NO_REQUEST';
}