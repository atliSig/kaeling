/**
 * Will show all the forms that the signed in person has been working on
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');

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
			'date':moment(req.currentUserForms[key].createdAt).format("MMM Do YY"),
			});
	});
	jobSelected = [];
	Object.keys(req.currentUserJobs).forEach(function(key) {
		jobSelected.push({
			'link':req.currentUserJobs[key]._id,
			'name':req.currentUserJobs[key].name,
			'customer':req.currentUserJobs[key].customer.name,
			'date':moment(req.currentUserJobs[key].createdAt).format('MMM Do YY')});
	});
	upcomingSelected =[];
	Object.keys(req.upcomingJobs).forEach(function(key) {
		upcomingSelected.push({
			'link':req.upcomingJobs[key]._id,
			'name':req.upcomingJobs[key].name,
			'customer':req.upcomingJobs[key].customer.name,
			'date':moment(req.upcomingJobs[key].createdAt).format('MMM Do YY'),
			'deadline':moment(req.upcomingJobs[key].createdAt).add(req.upcomingJobs[key].period,'months').format("MMM Do YY"),
		});
	});
	view.render('index', {
		currentUser: req.user,
		currentUserjobs: req.currentUserJobs,
		currentUserforms: req.currentUserForms,
		upcomingJobs: req.upcomingJobs,
		jobTitles:['Nafn','Viðskiptavinur','Fært inn'],
		formTitles:['Nafn','Viðskiptavinur','Yfirverk','Fært inn'],
		upcomingTitles:['Nafn','Viðskiptavinur','Fært inn','Tímamörk'],
		jobKeys:['name','customer','date'],
		formKeys:['name','customer','job','date'],
		upcomingKeys:['name','customer','date','deadline'],
		jobSelected:jobSelected,
		formSelected:formSelected,
		upcomingSelected:upcomingSelected,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs
	});
};