/**
 * Shows a list of all jobs
 */

var keystone = require('keystone');
var Form = keystone.list('Form');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'jobs';

	selected = [];
	Object.keys(req.session.allJobs).forEach(function(key) {
		selected.push({
			'link':req.session.allJobs[key]._id,
			'name':req.session.allJobs[key].name,
			'customer':req.session.allJobs[key].customer.name,
			'date':req.session.allJobs[key].prettyDate});
	});

	view.render('overview', {
		currentUser: req.user,
		type:'jobs',
		selected: selected,
		titles:['Nafn','Viðskiptavinur','Fært inn'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};
