/**
 * Index for a user
 */

var keystone = require('keystone');
var moment = require('moment');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	selected = [];
	Object.keys(req.formsByUser).forEach(function(key) {
		selected.push({
			'link':req.formsByUser[key]._id,
			'name':req.formsByUser[key].name,
			'customer':req.formsByUser[key].job.customer.name,
			'job': req.formsByUser[key].job.name,
			'date':moment(req.formsByUser[key].createdAt).format("MMM Do YY"),
			});
	});

	view.render('user', {
		currentUser: req.user,
		user: req.userById,
		count: req.formsByUser.length,
		type:'forms',
		selected: selected,
		keys:['name','customer','job','date'],
		titles:['Nafn','Viðskiptavinur','Yfirverk','Dagsetning'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editUser', {
		currentUser: req.user,
		user:req.userById,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs
	});
}

exports = module.exports;