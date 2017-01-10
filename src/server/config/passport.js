const nextTick = require('../utils/nextTick');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../model/User');

const gitHubConfig = {
	clientID: process.env.GITHUB_KEY,
	clientSecret: process.env.GITHUB_SECRET,
	callbackURL: process.env.APP_URL + 'auth/github/callback'
};

function createUserIfNotExisting(user, profile, provider) {
	return new Promise((resolve, reject) => {
		if (user) {
			resolve(user);
		}

		const newUser = new User();

		newUser[provider].id = profile.id;
		newUser[provider].username = profile.username;
		newUser[provider].displayName = profile.displayName;

		newUser
		.save()
		.then(() => resolve(newUser))
		.catch(reject);
	});
}

module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	passport.use(new GitHubStrategy(gitHubConfig, (token, refreshToken, profile, done) => {
		nextTick
		.then(() => User.findOne({ 'github.id': profile.id }))
		.then(user => createUserIfNotExisting(user, profile, 'github'))
		.then(user => done(null, user));
	}));
};