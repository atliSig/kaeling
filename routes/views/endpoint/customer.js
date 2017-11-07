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
	selected = [];
	Object.keys(req.jobsByCustomer).forEach(function(key) {
		selected.push({
			'link':req.jobsByCustomer[key]._id,
			'name':req.jobsByCustomer[key].name,
			'user':req.jobsByCustomer[key].user.name,
			'date':moment(req.jobsByCustomer[key].createdAt).format("MMM Do YY"),
			});
	});

	view.render('customer', _.assign({
		currentUser: req.user,
		type:'jobs',
		customer: req.customerById,
		selected:selected,
		titles:['Nafn', 'Eigandi','Dagsetning'],
		keys:['name','user','date'],
		help: require.main.require('config/help.json').customer,
		},_.pick(req.session, ['userList', 'customerList', 'jobList']))
	);
};

module.exports.editGet = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editcustomer',{
		currentUser: req.user,
		customer: req.customerById, 
		help: require.main.require('config/help.json').customerEdit,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

module.exports.editPost = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editcustomer',{
		currentUser: req.user,
		customer: req.customerById, 
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		help: require.main.require('config/help.json').customerEdit,
		notification: {body:'Viðskiptavini var breytt', icon:'fa-check', type:'success'},
		lists: _.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

exports = module.exports;
