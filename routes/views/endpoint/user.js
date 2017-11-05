/**
 * Index for a user
 */

var keystone = require('keystone');
var moment = require('moment');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	helpTitle = 'Yfirlitssíða starfsmanns';
	helpBody ='Hér er hægt að skoða þær skýrslur og verkefni sem starfsmaður er skráður fyrir';
	
	jobSelected = [];
	Object.keys(req.jobsByUser).forEach(function(key) {
		jobSelected.push({
			'link':req.jobsByUser[key]._id,
			'name':req.jobsByUser[key].name,
			'customer':req.jobsByUser[key].customer.name,
			'date':moment(req.jobsByUser[key].createdAt).format('MMM Do YY')});
	});
	formSelected = [];
	Object.keys(req.formsByUser).forEach(function(key) {
		formSelected.push({
			'link':req.formsByUser[key]._id,
			'name':req.formsByUser[key].name,
			'customer':req.formsByUser[key].job.customer.name,
			'job': req.formsByUser[key].job.name,
			'date':moment(req.formsByUser[key].createdAt).format("MMM Do YY"),
			});
	});

	view.render('user', {
		currentUser: req.user,
		user: req.userById,
		count: req.formsByUser.length,
		type:'forms',
		jobSelected: jobSelected,
		formSelected: formSelected,
		jobKeys:['name','customer','date'],
		jobTitles:['Nafn','Viðskiptavinur','Fært inn'],
		formKeys:['name','customer','job','date'],
		formTitles:['Nafn','Viðskiptavinur','Yfirverk','Dagsetning'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	helpTitle = 'Breytingarsíða starfsmanns';
	helpBody =
		'Hér er hægt að breyta grunnupplýsingum um starsmann';
	view.render('edit/editUser', {
		currentUser: req.user,
		user:req.userById,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
}

exports = module.exports;