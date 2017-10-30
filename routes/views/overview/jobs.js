/**
 * Shows a list of all jobs
 */

var keystone = require('keystone');
var Form = keystone.list('Form');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'jobs';

	view.render('overview/jobs', {jobs: req.jobs});
};
