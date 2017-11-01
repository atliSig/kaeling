/**
 * Index for a user
 */

var keystone = require('keystone');
var Form = keystone.list('Form');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('form', {
		form: req.form,
		users:req.users,
		jobs:req.jobs});
};


module.exports.post = function (req, res) {
	Form.model.findById(req.params.formId).exec(function(err,form){
		var data = req.body;
		form.getUpdateHandler(req).process(data,function(err){
			res.redirect('/');
		})
	});
};

exports = module.exports;
