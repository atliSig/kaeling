/**
 * Shows a list of all customers
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	selected = [];
	Object.keys(req.session.allCustomers).forEach(function(key) {
		selected.push({
			'link':req.session.allCustomers[key]._id,
			'name':req.session.allCustomers[key].name,
			'location':req.session.allCustomers[key].location.street1+', '+req.session.allCustomers[key].location.suburb,
			'date':req.session.allCustomers[key].prettyDate});
	});
	locals.section = 'customers';
	view.render('overview', {
		currentUser: req.user,
		type:'customers',
		selected:selected,
		titles:['Fyrirtæki','Staður','Fært inn'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};
