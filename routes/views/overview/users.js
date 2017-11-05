/**
 * Shows a list of all users
 */

var keystone = require('keystone');
var moment = require('moment');
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
			'date':moment(req.session.allUsers[key].createdAt).format('MMM Do YY')});
	});
	view.render('overview', {
		currentUser: req.user,
		type: 'users',
		selected: selected,
		titles:['Nafn', 'Póstur', 'Færður inn'],
		keys:['name','email','date'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};