/**
 * Shows a list of all users
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'users';

	view.render('overview', {
		data: req.users,
		keys:['name','email','prettyDate'],
		titles:['Nafn', 'Póstur', 'Færður inn']});
};