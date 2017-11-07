/**
 * Index for a user
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var tables = require.main.require('config/tables.json');
	view.render('user', {
		currentUser: req.user,
		user: req.userById,
		forms: _.assign({values: req.formsByUser}, tables.userForms),
		jobs:  _.assign({values: req.jobsByUser}, tables.userJobs),
		help: require.main.require('config/help.json').user,
		lists: req.session.lists
	});
};

module.exports.editGet = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.render('edit/editUser',{
		currentUser: req.user,
		user:req.userById,
		help: require.main.require('config/help.json').userEdit,
		lists: req.session.lists
	});
}

module.exports.editPost = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editUser',{
		currentUser: req.user,
		user:req.userById,
		help: require.main.require('config/help.json').userEdit,
		lists: req.session.lists,
		notification: {body:'Notanda var breytt', icon:'fa-check', type:'success'}
	});
}

exports = module.exports;