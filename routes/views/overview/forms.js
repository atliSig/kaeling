/**
 * Shows a list of all forms
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.section = 'forms';
	
	selected = [];
	Object.keys(req.allForms).forEach(function(key) {
		selected.push({
			'link':req.allForms[key]._id,
			'name':req.allForms[key].name,
			'customer':req.allForms[key].job.customer.name,
			'user':req.allForms[key].user.name,
			'job': req.allForms[key].job.name,
			'date':req.allForms[key].prettyDate,
			});
	});

	view.render('overview', {
		currentUser: req.user,
		type:'forms',
		selected: selected,
		titles:['nafn','Viðskiptavinur','Starfsmaður','Yfirverk','Dagsetning'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};
