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

	selected = [];
	Object.keys(req.allJobs).forEach(function(key) {
		selected.push({
			'link':req.allJobs[key]._id,
			'name':req.allJobs[key].name,
			'customer':req.allJobs[key].customer.name,
			'date':moment(req.allJobs[key].createdAt).format('MMM Do YY'),
		});
	});

	view.render('overview',{
		currentUser: req.user,
		type:'jobs',
		selected: selected,
		titles:['Nafn','Viðskiptavinur','Fært inn'],
		keys:[,'name','customer','date'],
		help: require.main.require('config/help.json').jobs,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	})
};
