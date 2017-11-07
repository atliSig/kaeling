/**
 * Index for a job
 */

var keystone = require('keystone');
var moment = require('moment');
var _ = require('lodash');
require('rootpath')();
module.exports.get = function (req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	selected = [];
	Object.keys(req.formsByJob).forEach(function(key) {
		var measurements = {};
		var form = req.formsByJob[key];
		Object.keys(form.measurements).forEach(function(key) {
			if(typeof form.measurements[key] === 'object' && 'isMeasurement' in form.measurements[key]){
				measurements[key]=form.measurements[key];
			}
		});
		selected.push({
			'link':req.formsByJob[key]._id,
			'name':req.formsByJob[key].name,
			'user':req.formsByJob[key].user.name,
			'date':moment(req.formsByJob[key].createdAt).format("MMM Do YY"),
			'diary':req.formsByJob[key].diary,
			'measurements':measurements,
		});
	});
	view.render('job',{
		currentUser: req.user,
		type: 'forms',
		job: req.jobById, 
		selected: selected,
		titles:['Nafn','Starfsmaður','Dagsetning'],
		keys:['name','user','date'],
		help: require.main.require('config/help.json').job,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
};

module.exports.editGet = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.render('edit/editjob',{
		currentUser: req.user,
		job: req.jobById,
		help: require.main.require('config/help.json').jobEdit,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

module.exports.editPost = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	view.render('edit/editjob', {
		currentUser: req.user,
		job: req.jobById, 
		notification: {body:'Verkefni var breytt', icon:'fa-check', type:'success'},
		help: require.main.require('config/help.json').jobEdit,
		lists:_.pick(req.session, ['userList', 'customerList', 'jobList'])
	});
}

module.exports.create = function(req,res){
	res.redirect('/jobs/'+req.jobId);
}

module.exports.delete = function(req,res){
	res.redirect('/jobs');
}

exports = module.exports;