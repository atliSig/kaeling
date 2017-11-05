/**
 * Index for a form
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');
module.exports.get = function(req,res,next){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	var checks = req.formById.checks;
	var attributes = {};
	Object.keys(checks).forEach(function(key) {
		if(typeof checks[key] === 'object' && 'isAttribute' in checks[key]){
			attributes[key]=checks[key];
		}
	});
	view.render('form',{
		form:req.formById,
		attributes:attributes,
		titles:['Nafn','Í lagi','Lagað','Athugasemd'],
		currentUser: req.user,
		users:req.session.allUsers,
		jobs:req.session.allJobs,
		customers:req.session.allCustomers
	}) 
}

module.exports.edit = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals
	var checks = req.formById.checks;
	var measures = req.formById.measurements;
	var attributes = {};
	Object.keys(checks).forEach(function(key) {
		if(typeof checks[key] === 'object' && 'isAttribute' in checks[key]){
			attributes[key]=checks[key];
		}
	});
	var measurements = {};
	Object.keys(measures).forEach(function(key) {
		if(typeof measures[key] === 'object' && 'isMeasurement' in measures[key]){
			measurements[key]=measures[key];
		}
	});
	console.log(measurements);
	req.formById.formDate = moment(req.formById.createdAt).format("YYYY-MM-DD");
	req.formById.date = moment(req.formById.createdAt).format("MMM Do YY");
	view.render('edit/editform', {
		currentUser: req.user,
		count: Object.keys(attributes).length,
		form: req.formById,
		attributes:attributes,
		measurements:measurements,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};

module.exports.create = function(req,res){
	res.redirect('/forms/'+req.formId+'/edit');
}

exports = module.exports;
