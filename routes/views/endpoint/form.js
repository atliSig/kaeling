/**
 * Index for a form
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');
module.exports.get = function(req,res,next){
	var view = new keystone.View(req,res);
	var locals = res.locals;
	helpTitle = 'Yfirlitssíða Skýrslu';
	helpBody =
		'Hér er hægt að skoða ákveðna skýrslu í þaula. Hér koma fram allar þær upplýsingar'+
		' sem koma fram í þessari skýrslu. Hér er líka hægt að velja að breyta skýrslu';
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
	req.formById.date = moment(req.formById.createdAt).format("MMM Do YY");
	view.render('form',{
		form:req.formById,
		attributes:attributes,
		measurements:measurements,
		titles:['Nafn','Í lagi','Lagað','Athugasemd'],
		currentUser: req.user,
		users:req.session.allUsers,
		jobs:req.session.allJobs,
		customers:req.session.allCustomers,
		helpBody:helpBody,
		helpTitle:helpTitle
	}) 
}

module.exports.edit = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	helpTitle = 'Breytingarsíða Skýrslu';
	helpBody =
		'Hér er hægt að breyta skýrslunni og hvaða upplýsingar koma fram í henni';
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
	req.formById.formDate = moment(req.formById.createdAt).format("YYYY-MM-DD");
	req.formById.date = moment(req.formById.createdAt).format("MMM Do YY");
	view.render('edit/editform', {
		currentUser: req.user,
		attributeCount: Object.keys(attributes).length,
		measurementCount: Object.keys(measurements).length,
		form: req.formById,
		attributes:attributes,
		measurements:measurements,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
};

module.exports.create = function(req,res){
	res.redirect('/forms/'+req.formId+'/edit');
}

module.exports.delete = function(req,res){
	res.redirect('/forms');
}

exports = module.exports;
