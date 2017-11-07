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

	view.render('overview',{
		currentUser: req.user,
		selected:_.assign({values:req.allCustomers}, require.main.require('config/tables.json').customers),
		help: require.main.require('config/help.json').customers,
		lists: req.session.lists
	});
};
