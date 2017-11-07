/**
 * Index for a customer
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.render('customer',{
		currentUser: req.user,
		customer: req.customerById,
		selected:_.assign({values:req.jobsByCustomer}, require.main.require('config/tables.json').jobs),
		help: require.main.require('config/help.json').customer,
		lists: req.session.lists
	});
};

module.exports.editGet = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editcustomer',{
		currentUser: req.user,
		customer: req.customerById, 
		help: require.main.require('config/help.json').customerEdit,
		lists: req.session.lists
	});
}

module.exports.editPost = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editcustomer',{
		currentUser: req.user,
		customer: req.customerById, 
		help: require.main.require('config/help.json').customerEdit,
		lists: req.session.lists,
		notification: {body:'Viðskiptavini var breytt', icon:'fa-check', type:'success'}
	});
}

exports = module.exports;
