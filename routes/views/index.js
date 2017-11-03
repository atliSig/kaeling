/**
 * Will show all the forms that the signed in person has been working on
 */

var keystone = require('keystone');
var Form = keystone.list('Form');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';
	formSelected = [];
	Object.keys(req.currentUserForms).forEach(function(key) {
		formSelected.push({
			'link':req.currentUserForms[key]._id,
			'name':req.currentUserForms[key].name,
			'customer':req.currentUserForms[key].job.customer.name,
			'job': req.currentUserForms[key].job.name,
			'date':req.currentUserForms[key].prettyDate,
			});
	});
	jobSelected = [];
	Object.keys(req.currentUserJobs).forEach(function(key) {
		jobSelected.push({
			'link':req.currentUserJobs[key]._id,
			'name':req.currentUserJobs[key].name,
			'customer':req.currentUserJobs[key].customer.name,
			'date':req.currentUserJobs[key].prettyDate});
	});
	upcomingSelected =[];
	Object.keys(req.upcomingJobs).forEach(function(key) {
		upcomingSelected.push({
			'link':req.upcomingJobs[key]._id,
			'name':req.upcomingJobs[key].name,
			'customer':req.upcomingJobs[key].customer.name,
			'date':req.upcomingJobs[key].prettyDate,
			'deadline':req.upcomingJobs[key].deadline});
	});
	view.render('index', {
		currentUser: req.user,
		currentUserjobs: req.currentUserJobs,
		currentUserforms: req.currentUserForms,
		upcomingJobs: req.upcomingJobs,
		jobTitles:['Nafn','Viðskiptavinur','Fært inn'],
		formTitles:['Nafn','Viðskiptavinur','Yfirverk','Fært inn'],
		upcomingTitles:['Nafn','Viðskiptavinur','Fært inn','Tímamörk'],
		jobSelected:jobSelected,
		formSelected:formSelected,
		upcomingSelected:upcomingSelected,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs
	});
};

module.exports.redirect = function(req,res,next){
	res.redirect('/');
}