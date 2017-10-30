/**
 * Shows a list of all customers
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'customers';
	view.render('overview', {
		data: req.customers,
		keys:['name','location','prettyDate'],
		titles:['Fyrirtæki','Staður','Fært inn']});
};
