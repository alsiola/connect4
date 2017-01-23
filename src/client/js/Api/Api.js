import axios from 'axios';

const saveResult = (winnerName, loserName) => {
    return axios.post('/api/save-result', {
        winnerName,
        loserName
    });
}

const loadHallOfFameData = () => {
    return axios.get('/api/high-scores');
}

export default {
    saveResult,
    loadHallOfFameData
}