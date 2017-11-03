/**
 * Index for a job
 */

var keystone = require('keystone');

module.exports.get = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	selected = [];
	Object.keys(req.formsByJob).forEach(function(key) {
		selected.push({
			'link':req.formsByJob[key]._id,
			'name':req.formsByJob[key].name,
			'user':req.formsByJob[key].user.name,
			'date':req.formsByJob[key].prettyDate,
			});
	});
	console.log(req.jobById._id.toString());
	view.render('job', {
		currentUser: req.user,
		type: 'forms',
		job: req.jobById, 
		selected: selected,
		titles:['Nafn','Starfsmaður','Dagsetning'],
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