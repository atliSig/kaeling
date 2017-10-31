/**
 * Shows a list of all forms
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	locals.section = 'forms';
	
	selected = [];
	Object.keys(req.forms).forEach(function(key) {
		selected.push({
			'link':req.forms[key]._id,
			'name':req.forms[key].name,
			'customer':req.forms[key].job.customer.name,
			'user':req.forms[key].user.name,
			'job': req.forms[key].job.name,
			'date':req.forms[key].prettyDate,
			});
	});

	view.render('overview', {
		type:'forms',
		data: req.forms,
		selected: selected,
		titles:['nafn','Viðskiptavinur','Starfsmaður','Yfirverk','Dagsetning']});
};
