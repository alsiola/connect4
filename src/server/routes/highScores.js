const Player = require('../model/Player');

module.exports = app => app.get('/api/high-scores', (req, res) => {

    Promise.all([getPlayers(), getPlayerCount()])
    .then(([players, count]) => {
        res.json({
            players,
            success: true
        });
        res.end();
    })
    .catch(() => {
        res.json({
            success: false
        })
    });            
});

const getPlayers = () => {
    return new Promise((resolve, reject) => {
        Player
        .find({})
        .sort('-wins')
        .select('name wins totalGames')
        .exec((err, players) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(players.map((player, i) => {
                return Object.assign({}, player.toObject(), { rank: i + 1 });
            }));
        });
    })
}

const getPlayerCount = () => {
    return new Promise((resolve, reject) => {
        Player.count().exec((err, count) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(count);
        })
    })
}

