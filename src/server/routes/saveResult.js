const Player = require('../model/Player');

const createIfNotPresent = (player, name) => {
    return new Promise((resolve, reject) => {
        if (player) {
            resolve(player);
            return;
        }

        new Player({ name })
        .save((err, savedPlayer) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(savedPlayer);
        });
    })
}

const findPlayerByName = name => {
    return new Promise((resolve, reject) => {
        Player
        .findOne({
            name
        })
        .exec((err, player) => {
            if (err) {
                reject(err);
                return;
            }

            resolve(player);
        });
    });    
}

const addGame = player => {
    player.totalGames += 1;
    return player;
}

const addWin = player => {
    player.wins += 1;
    return player;
}

const findOrCreatePlayer = name => {
    return findPlayerByName(name)
    .then(player => createIfNotPresent(player, name));
}

const updateLoser = name => {
    return findOrCreatePlayer(name)
    .then(addGame)
    .then(player => player.save())
}

const updateWinner = name => {
    return findOrCreatePlayer(name)
    .then(addWin)
    .then(addGame)
    .then(player => player.save())
}

module.exports = app => app.post('/api/save-result', (req, res) => {
    Promise.all([
        updateWinner(req.body.winnerName),
        updateLoser(req.body.loserName)
    ])
    .then(() => {
        res.json({
            success: true
        });
        res.end();
    })
    .catch(() => {
        res.json({
            success: false
        });
        res.end();
    });
});