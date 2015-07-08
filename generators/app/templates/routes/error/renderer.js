var renderer = function(err, req, res, next) {
	res.status(500);
	if (req.xhr) {
		return res.json({success: 0, error: err.message});
	}
	else {
		return res.render('error', {message: err.message, error: process.env.NODE_ENV === 'development' ? err : {}});
	}
};

module.exports = renderer;
