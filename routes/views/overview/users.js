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

	selected = [];
	Object.keys(req.users).forEach(function(key) {
		selected.push({
			'link':req.users[key]._id,
			'name':req.users[key].name,
			'email':req.users[key].email,
			'date':req.users[key].prettyDate});
	});
	console.log(Object.keys(selected));
	view.render('overview', {
		data: req.users,
		selected: selected,
		titles:['Nafn', 'Póstur', 'Færður inn']});
};