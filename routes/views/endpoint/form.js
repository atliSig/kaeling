/**
 * Index for a form
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
module.exports.get = function(req,res,next){
	var view = new keystone.View(req,res);
	var locals = res.locals;

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
		titles:['Nafn','Í lagi','Viðgert','Athugasemd'],
		currentUser: req.user,
		help: require.main.require('config/help.json').form,
		lists: _.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

module.exports.editGet = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
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
		help: require.main.require('config/help.json').formEdit,
		lists: _.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};

module.exports.editPost = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
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
		help: require.main.require('config/help.json').formEdit,
		notification: {body:'Skýrslu var breytt', icon:'fa-check', type:'success'},
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};

module.exports.create = function(req,res){
	res.redirect('/forms/'+req.formId+'/edit');
}

module.exports.delete = function(req,res){
	res.redirect('/forms');
}

exports = module.exports;
