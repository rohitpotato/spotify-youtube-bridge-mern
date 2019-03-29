const keys = require('../config/keys');

const ensureAuthenticated = (req, res, next) => {

	if(req.isAuthenticated()) {

		return next();
	}

	res.redirect(`${keys.baseUrl}/login`);
};

module.exports = ensureAuthenticated;