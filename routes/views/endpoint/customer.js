/**
 * Index for a customer
 */

var keystone = require('keystone');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	selected = [];
	console.log(req.customer);
	Object.keys(req.jobs).forEach(function(key) {
		selected.push({
			'link':req.jobs[key]._id,
			'name':req.jobs[key].name,
			'user':req.jobs[key].user.name,
			'date':req.jobs[key].prettyDate,
			});
	});
	view.render('customer', {
		type:'jobs',
		customer: req.customer,
		selected:selected,
		titles:['Nafn', 'Eigandi','Dagsetning']
		});
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editcustomer', {
		customer: req.customer, 
		users:req.users,
	});
}

exports = module.exports;
