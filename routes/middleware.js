/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');

var keystone = require('keystone');
var Job = keystone.list('Job');
var Customer  = keystone.list('Customer');

var moment = require('moment');
/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Heim', key: 'home', href: '/' },
		{ label: 'Áríðaðandi', key: 'upcoming', href: '/upcoming'},
		{ label: 'Umsjónarkerfi', key: 'keystone', href:'/keystone'}
	];
	res.locals.user = req.user;
	next();
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};


/**
 * Returns a list of all jobs that should be worked on within 2 weeks from
 * now, and have not been finished for this period.
 */
exports.getUpcoming = function(req,res,next){
	req.jobs = [];
	Job.model.find().exec(function(err,jobs){
			Object.keys(jobs).forEach(function(key) {
				//if(moment().subtract(2,'week').isAfter(moment(jobs[key].createdAt).add(jobs[key].period,'month'))){
					if(!jobs[key].done && !jobs[key].doneNow){
						jobs[key].prettyDate = moment(jobs[key].createdAt).format("MMM Do YY");
						req.jobs.push(jobs[key]);
					}
				//}
			});
			next();
	});
}

exports.setCustomers = function(req,res,next){
	customerIds = [];
	req.jobs.forEach(function(job){
		customerIds.push(job.customer);
	})
	Customer.model.find({
		'_id': { $in: customerIds}
	}, function(err, customers){
		for(var i=0; i<req.jobs.length; i++){
			for(var j=0; j<customers.length; j++){
				if(req.jobs[i].customer.toString() == customers[j]._id.toString()){
					req.jobs[i].customerObject = customers[j];
				}
			}
		}
		next();
	});
}