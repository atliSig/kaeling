/**
 * Shows a list of all jobs
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'jobs';
	helpTitle = 'Yfirlitssíða verkefna';
	helpBody =
		'Hér er hægt að nálgast öll verkefni sem eru skráð í kerfinu';

	selected = [];
	Object.keys(req.session.allJobs).forEach(function(key) {
		selected.push({
			'link':req.session.allJobs[key]._id,
			'name':req.session.allJobs[key].name,
			'customer':req.session.allJobs[key].customer.name,
			'date':moment(req.session.allJobs[key].createdAt).format('MMM Do YY'),
		});
	});

	view.render('overview', {
		currentUser: req.user,
		type:'jobs',
		selected: selected,
		titles:['Nafn','Viðskiptavinur','Fært inn'],
		keys:[,'name','customer','date'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
};
