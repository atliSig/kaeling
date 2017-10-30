/**
 * Index for a job
 */

var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	console.log(req.job);
	view.render('endpoint/job', {job: req.job});
};
