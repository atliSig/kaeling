/**
 * Shows a list of all forms
 */

var keystone = require('keystone');
var moment = require('moment');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'forms';
	helpTitle = 'Yfirlitssíða skýrslna';
	helpBody =
		'Hér er hægt að nálgast allar skýrslur sem eru skráðar í kerfinu';

	selected = [];
	Object.keys(req.allForms).forEach(function(key) {
		selected.push({
			'link':req.allForms[key]._id,
			'name':req.allForms[key].name,
			'customer':req.allForms[key].job.customer.name,
			'user':req.allForms[key].user.name,
			'job': req.allForms[key].job.name,
			'date':moment(req.allForms[key].createdAt).format('MMM Do YY'),
			});
	});

	view.render('overview', {
		currentUser: req.user,
		type:'forms',
		selected: selected,
		titles:['nafn','Viðskiptavinur','Starfsmaður','Yfirverk','Dagsetning'],
		keys:['name','customer','user','job','date'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
};
