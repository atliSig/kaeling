/**
 * Index for a job
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();

module.exports.get = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.render('job',{
		currentUser: req.user,
		job: req.jobById,
		forms: _.assign({values : req.formsByJob},require.main.require('config/tables.json').jobs),
		help: require.main.require('config/help.json').job,
		lists: req.session.lists
	});
};

module.exports.editGet = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.render('edit/editjob',{
		currentUser: req.user,
		job: req.jobById,
		help: require.main.require('config/help.json').jobEdit,
		lists: req.session.lists
	});
}

module.exports.editPost = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	s
	view.render('edit/editjob', {
		currentUser: req.user,
		job: req.jobById, 
		notification: {body:'Verkefni var breytt', icon:'fa-check', type:'success'},
		help: require.main.require('config/help.json').jobEdit,
		lists: req.session.lists
	});
}

module.exports.create = function(req,res){
	res.redirect('/jobs/'+req.jobId);
}

module.exports.delete = function(req,res){
	res.redirect('/jobs');
}

exports = module.exports;