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
		help: require.main.require('config/help.json').user,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};

module.exports.editGet = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.render('edit/editUser',{
		currentUser: req.user,
		user:req.userById,
		help: require.main.require('config/help.json').userEdit,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

module.exports.editPost = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editUser',{
		currentUser: req.user,
		user:req.userById,
		notification: {body:'Notanda var breytt', icon:'fa-check', type:'success'},
		help: require.main.require('config/help.json').userEdit,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

exports = module.exports;