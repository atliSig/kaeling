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
	var page = {
		active:(req.query.active || 'createdAt'),
		sort:(req.query.sort || 1)};
	view.render('overview', {
		currentUser: req.user,
		selected:_.assign({values:req.allForms,pagination:page}, require.main.require('config/tables.json').forms),
		help: require.main.require('config/help.json').forms,
		lists: req.session.lists
	});
};
