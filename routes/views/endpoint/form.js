/**
 * Index for a form
 */

var keystone = require('keystone');
var Form = keystone.list('Form');
module.exports.edit = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals
	var checks = req.formById.checks;
	var attributes = {};
	Object.keys(checks).forEach(function(key) {
		if(typeof checks[key] === 'object' && 'isAttribute' in checks[key]){
			attributes[key]=checks[key];
		}
	});
	view.render('edit/editform', {
		currentUser: req.user,
		count: Object.keys(attributes).length,
		form: req.formById,
		attributes:attributes,
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
};

module.exports.create = function(req,res){
	res.redirect('/forms/'+req.formId+'/edit');
}

exports = module.exports;
