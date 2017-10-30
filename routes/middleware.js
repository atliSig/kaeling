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
var Form = keystone.list('Form');
var User = keystone.list('User');


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
		{ label: 'Verkefni', key:'jobs', href:'/jobs'},
		{ label: 'Skýrslur', key:'forms', href:'/forms'},
		{ label: 'Fyrirtæki', key: 'customers', href:'/customers'},
		{ label: 'Notendur', key:'users', href:'/users'},
		{ label: 'Áríðaðandi', key: 'upcoming', href: '/upcoming'},
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

exports.getFormsByUser = function(req,res,next){
	Form.model.find({user:req.user._id}).exec(function(err,forms){
		req.forms = forms;
		next();
	});
}


/**
 * Middleware for selecting in bulk,
 * consider pagination here later
 */
exports.getAllJobs = function(req,res,next){
	Job.model.find().exec(function(err,jobs){
		Object.keys(jobs).forEach(function(key) {
			jobs[key].prettyDate = moment(jobs[key].createdAt).format("MMM Do YY");
		});
		req.jobs = jobs;
		next();
	});
}

exports.getAllUsers = function(req,res,next){
	User.model.find().exec(function(err,users){
		Object.keys(users).forEach(function(key) {
			users[key].prettyDate = moment(users[key].createdAt).format("MMM Do YY");
		});
		req.users = users;
		next();
	});
}

exports.getAllCustomers = function(req,res,next){
	Customer.model.find().exec(function(err,customers){
		Object.keys(customers).forEach(function(key) {
			customers[key].prettyDate = moment(customers[key].createdAt).format("MMM Do YY");
		});
		req.customers = customers;
		next();
	});
}

exports.getAllForms = function(req,res,next){
	Form.model.find().exec(function(err,forms){
		Object.keys(forms).forEach(function(key) {
			forms[key].prettyDate = moment(forms[key].createdAt).format("MMM Do YY");
		});
		req.forms = forms;
		next();
	});
}

/**
 * Middleware for endpoints
 */

exports.getJobById = function(req,res,next){
	Job.model.findById(req.params.jobId, function(err,job){
		req.job = job;
		next();
	});
}
exports.getUserById = function(req,res,next){
	User.model.findById(req.params.userId, function(err,user){
		req.user = user;
		next();
	});
}
exports.getFormById = function(req,res,next){
	Form.model.findById(req.params.formId, function(err,form){
		req.form = form;
		next();
	});
}
exports.getCustomerById = function(req,res,next){
	Customer.model.findById(req.params.customerId, function(err,customer){
		req.customer = customer;
		next();
	});
}

