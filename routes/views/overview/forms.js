/**
 * Shows a list of all forms
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'forms';
	view.render('overview', {
		data: req.forms,
		keys:['customer','user','job','prettyDate'],
		titles:['Viðskiptavinur','Starfsmaður','Yfirverk','Dagsetning']});
};
