/**
 * Will show all the forms that the signed in person has been working on
 */

var keystone = require('keystone');
var Form = keystone.list('Form');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.section = 'home';
	formSelected = [];
	Object.keys(req.forms).forEach(function(key) {
		formSelected.push({
			'link':req.forms[key]._id,
			'name':req.forms[key].name,
			'customer':req.forms[key].job.customer.name,
			'job': req.forms[key].job.name,
			'date':req.forms[key].prettyDate,
			});
	});
	jobSelected = [];
	Object.keys(req.jobs).forEach(function(key) {
		jobSelected.push({
			'link':req.jobs[key]._id,
			'name':req.jobs[key].name,
			'customer':req.jobs[key].customer.name,
			'date':req.jobs[key].prettyDate});
	});
	upcomingSelected =[];
	Object.keys(req.upcoming).forEach(function(key) {
		upcomingSelected.push({
			'link':req.upcoming[key]._id,
			'name':req.upcoming[key].name,
			'customer':req.upcoming[key].customer.name,
			'date':req.upcoming[key].prettyDate,
			'deadline':req.upcoming[key].deadline});
	});
	view.render('index', {
		jobs: req.jobs,
		forms: req.forms,
		upcoming: req.upcoming,
		jobTitles:['Nafn','Viðskiptavinur','Fært inn'],
		formTitles:['Nafn','Viðskiptavinur','Yfirverk','Fært inn'],
		upcomingTitles:['Nafn','Viðskiptavinur','Fært inn','Tímamörk'],
		jobSelected:jobSelected,
		formSelected:formSelected,
		upcomingSelected:upcomingSelected
	});
};
