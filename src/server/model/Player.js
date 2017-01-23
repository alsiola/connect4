const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
	name: String,
	wins: {type: Number, default: 0},
	totalGames: {type: Number, default: 0}
});

module.exports = mongoose.model('Player', Player);