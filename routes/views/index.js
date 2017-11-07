/**
 * Will show all the forms that the signed in person has been working on
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
module.exports.get = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'home';
	var tables = require.main.require('config/tables.json');
	
	view.render('index', {
		currentUser: req.user,
		selectedForms :_.assign({ values: req.currentUserForms},tables.userForms),
		selectedJobs  :_.assign({ values: req.currentUserJobs},tables.userJobs),
		selectedUpcoming : _.assign({ values: req.upcomingJobs},tables.upcoming),
		help: require.main.require('config/help.json').index,
		lists: req.session.lists
	});
};