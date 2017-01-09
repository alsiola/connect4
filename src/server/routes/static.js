var path = process.cwd();

module.exports = function (app) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});
};