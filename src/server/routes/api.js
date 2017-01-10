const isLoggedIn = require('../utils/isLoggedIn');

module.exports = app => {
	app.get('/api/currentuser', isLoggedIn, (req, res) => {
		res.json({
			name: req.user.github.displayName
		});
	});
};