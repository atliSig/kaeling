/**
 * Shows a list of all jobs
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'jobs';
	console.log(req.allJobs);
	view.render('overview',{
		currentUser: req.user,
		selected:_.assign({values:req.allJobs}, require.main.require('config/tables.json').jobs),
		help: require.main.require('config/help.json').jobs,
		lists: req.session.lists
	})
};
