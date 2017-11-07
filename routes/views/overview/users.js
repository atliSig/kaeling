/**
 * Shows a list of all users
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'users';

	selected = [];
	Object.keys(req.allUsers).forEach(function(key) {
		selected.push({
			'link':req.allUsers[key]._id,
			'name':req.allUsers[key].name,
			'email':req.allUsers[key].email,
			'date':moment(req.allUsers[key].createdAt).format('MMM Do YY')});
	});
	view.render('overview',{
		currentUser: req.user,
		type: 'users',
		selected: selected,
		titles:['Nafn', 'Póstur', 'Færður inn'],
		keys:['name','email','date'],
		help: require.main.require('config/help.json').users,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};