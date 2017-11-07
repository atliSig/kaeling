/**
 * Shows a list of all customers
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'customers';	
	selected = [];
	Object.keys(req.allCustomers).forEach(function(key) {
		selected.push({
			'link':req.allCustomers[key]._id,
			'name':req.allCustomers[key].name,
			'location':req.allCustomers[key].location,
			'date':moment(req.allCustomers[key].createdAt).format("MMM Do YY")});
	});
	view.render('overview',{
		currentUser: req.user,
		type:'customers',
		selected:selected,
		titles:['Fyrirtæki','Staður','Fært inn'],
		keys:['name','location','date'],
		help: require.main.require('config/help.json').customers,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};
