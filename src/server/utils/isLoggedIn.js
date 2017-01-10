module.exports = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.json({
            success: false,
            error: "not authenticated"
        });
    }
}