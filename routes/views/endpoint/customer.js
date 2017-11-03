/**
 * Index for a customer
 */

var keystone = require('keystone');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	selected = [];
	Object.keys(req.jobsByCustomer).forEach(function(key) {
		selected.push({
			'link':req.jobsByCustomer[key]._id,
			'name':req.jobsByCustomer[key].name,
			'user':req.jobsByCustomer[key].user.name,
			'date':req.jobsByCustomer[key].prettyDate,
			});
	});
	view.render('customer', {
		currentUser: req.user,
		type:'jobs',
		customer: req.customerById,
		selected:selected,
		titles:['Nafn', 'Eigandi','Dagsetning'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs
		});
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editcustomer', {
		currentUser: req.user,
		customer: req.customer, 
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs
	});
}

exports = module.exports;
