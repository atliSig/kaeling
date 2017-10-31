/**
 * Shows a list of all jobs
 */

var keystone = require('keystone');
var Form = keystone.list('Form');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'jobs';

	selected = [];
	Object.keys(req.jobs).forEach(function(key) {
		selected.push({
			'link':req.jobs[key]._id,
			'name':req.jobs[key].name,
			'customer':req.jobs[key].customer.name,
			'date':req.jobs[key].prettyDate});
	});

	view.render('overview', {
		data: req.jobs,
		selected: selected,
		titles:['Nafn','Viðskiptavinur','Fært inn']});
};
