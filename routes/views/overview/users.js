/**
 * Shows a list of all users
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'users';

	selected = [];
	Object.keys(req.session.allUsers).forEach(function(key) {
		selected.push({
			'link':req.session.allUsers[key]._id,
			'name':req.session.allUsers[key].name,
			'email':req.session.allUsers[key].email,
			'date':req.session.allUsers[key].prettyDate});
	});
	console.log(selected);
	view.render('overview', {
		currentUser: req.user,
		type: 'users',
		selected: selected,
		titles:['Nafn', 'Póstur', 'Færður inn'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};