/**
 * Index for a user
 */

var keystone = require('keystone');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	selected = [];
	Object.keys(req.forms).forEach(function(key) {
		selected.push({
			'link':req.forms[key]._id,
			'name':req.forms[key].name,
			'customer':req.forms[key].job.customer.name,
			'job': req.forms[key].job.name,
			'date':req.forms[key].prettyDate,
			});
	});

	view.render('user', {
		user: req.user,
		count: req.forms.length,
		type:'forms',
		selected: selected,
		titles:['nafn','Viðskiptavinur','Yfirverk','Dagsetning']});
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editUser', {
		user:req.user
	});
}

exports = module.exports;