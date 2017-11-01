/**
 * Index for a job
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
			'user':req.forms[key].user.name,
			'date':req.forms[key].prettyDate,
			});
	});
	view.render('job', {
		type: 'forms',
		job: req.job, 
		forms: req.forms,
		selected: selected,
		titles:['Nafn','Starfsmaður','Dagsetning']}
	);
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editjob', {
		job: req.job, 
		users:req.users,
		customers:req.customers});
}

exports = module.exports;