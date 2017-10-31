/**
 * Shows a list of all customers
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	selected = [];
	Object.keys(req.customers).forEach(function(key) {
		selected.push({
			'link':req.customers[key]._id,
			'name':req.customers[key].name,
			'location':req.customers[key].location.street1+', '+req.customers[key].location.suburb,
			'date':req.customers[key].prettyDate});
	});
	locals.section = 'customers';
	view.render('overview', {
		data: req.customers,
		selected:selected,
		titles:['Fyrirtæki','Staður','Fært inn']});
};
