/**
 * Shows a list of all forms
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'forms';

	view.render('overview', {
		currentUser: req.user,
		selected:_.assign({values:req.allForms}, require.main.require('config/tables.json').forms),
		help: require.main.require('config/help.json').forms,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};
