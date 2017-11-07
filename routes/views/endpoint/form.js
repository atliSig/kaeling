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

	view.render('form',{
		form:req.formById,
		currentUser: req.user,
		help: require.main.require('config/help.json').form,
		lists: req.session.lists
	});
}

module.exports.editGet = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.render('edit/editform', {
		currentUser: req.user,
		form: req.formById,
		help: require.main.require('config/help.json').formEdit,
		lists: req.session.lists
	});
};

module.exports.editPost = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	view.render('edit/editform', {
		currentUser: req.user,
		form: req.formById,
		help: require.main.require('config/help.json').formEdit,
		lists: req.session.lists,
		notification: {body:'Skýrslu var breytt', icon:'fa-check', type:'success'}
	});
};

module.exports.create = function(req,res){
	res.redirect('/forms/'+req.formId+'/edit');
}

module.exports.delete = function(req,res){
	res.redirect('/forms');
}

exports = module.exports;
