/**
 * Index for a form
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
module.exports.edit = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals
	var checks = req.form.checks;
	var attributes = {};
	Object.keys(checks).forEach(function(key) {
		if(typeof checks[key] === 'object' && 'isAttribute' in checks[key]){
			attributes[key]=checks[key];
		}
	});
	view.render('edit/editform', {
		count: Object.keys(attributes).length,
		form: req.form,
		users:req.users,
		jobs:req.jobs,
		attributes:attributes});
};

exports = module.exports;
