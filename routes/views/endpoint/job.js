/**
 * Index for a job
 */

var keystone = require('keystone');
var moment = require('moment');
module.exports.get = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	selected = [];
	Object.keys(req.formsByJob).forEach(function(key) {
		selected.push({
			'link':req.formsByJob[key]._id,
			'name':req.formsByJob[key].name,
			'user':req.formsByJob[key].user.name,
			'date':moment(req.formsByJob[key].createdAt).format("MMM Do YY"),
			'diary':req.formsByJob[key].diary,
			});
	});
	view.render('job', {
		currentUser: req.user,
		type: 'forms',
		job: req.jobById, 
		selected: selected,
		titles:['Nafn','Starfsmaður','Dagsetning'],
		keys:['name','user','date'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs}
	);
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	view.render('edit/editjob', {
		currentUser: req.user,
		job: req.jobById, 
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs});
}

module.exports.create = function(req,res){
	res.redirect('/jobs/'+req.jobId);
}

exports = module.exports;