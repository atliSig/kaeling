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
var Customer = keystone.list('Customer');
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
		{ label: 'Verkefni', key: 'jobs', href: '/jobs' },
		{ label: 'Skýrslur', key: 'forms', href: '/forms' },
		{ label: 'Fyrirtæki', key: 'customers', href: '/customers' },
		{ label: 'Notendur', key: 'users', href: '/users' },
		{ label: 'Áríðaðandi', key: 'upcoming', href: '/upcoming' },
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
 * Middleware for the index
 */
exports.getFormsByCurrentUser = function (req, res, next) {
	Form.model.find({ user: req.user._id })
		.populate({
			path: 'job',
			model: 'Job',
			populate: {
				path: 'customer',
				model: 'Customer'
			}
		})
		.exec(function (err, forms) {
			Object.keys(forms).forEach(function (key) {
				forms[key].prettyDate = moment(forms[key].createdAt).format("MMM Do YY");
			});
			req.forms = forms;
			next();
		});
}

exports.getJobsByCurrentUser = function (req, res, next) {
	Job.model.find({ user: req.user._id })
		.populate('user')
		.populate('customer')
		.exec(function (err, jobs) {
			Object.keys(jobs).forEach(function (key) {
				jobs[key].prettyDate = moment(jobs[key].createdAt).format("MMM Do YY");
			});
			req.jobs = jobs;
			next();
		});
}

/**
 * Middleware for selecting in bulk,
 * consider pagination here later
 */
exports.getAllJobs = function (req, res, next) {
	Job.model.find().populate('customer').exec(function (err, jobs) {
		Object.keys(jobs).forEach(function (key) {
			jobs[key].prettyDate = moment(jobs[key].createdAt).format("MMM Do YY");
		});
		req.jobs = jobs;
		next();
	});
}

exports.getAllUsers = function (req, res, next) {
	User.model.find().exec(function (err, users) {
		Object.keys(users).forEach(function (key) {
			users[key].prettyDate = moment(users[key].createdAt).format("MMM Do YY");
		});
		req.users = users;
		next();
	});
}

exports.getAllCustomers = function (req, res, next) {
	Customer.model.find().exec(function (err, customers) {
		Object.keys(customers).forEach(function (key) {
			customers[key].prettyDate = moment(customers[key].createdAt).format("MMM Do YY");
		});
		req.customers = customers;
		next();
	});
}

exports.getAllForms = function (req, res, next) {
	Form.model.find()
		.populate({
			path: 'job',
			model: 'Job',
			populate: {
				path: 'customer',
				model: 'Customer'
			}
		})
		.populate('user')
		.exec(function (err, forms) {
			Object.keys(forms).forEach(function (key) {
				forms[key].prettyDate = moment(forms[key].createdAt).format("MMM Do YY");
			});
			req.forms = forms;
			next();
		});
}

/**
 * Middleware for endpoints
 */

exports.getJobById = function (req, res, next) {
	Job.model.findOne({ _id: req.params.jobId })
		.populate('user')
		.populate('customer')
		.exec(function (err, job) {
			job.prettyDate = moment(job.createdAt).format("MMM Do YY");
			req.job = job;
			next();
		});
}
exports.getUserById = function (req, res, next) {
	User.model.findById(req.params.userId, function (err, user) {
		req.user = user;
		next();
	});
}
exports.getFormById = function (req, res, next) {
	Form.model.findOne({_id:req.params.formId})
		.populate({
			path: 'job',
			model: 'Job',
			populate: {
				path: 'customer',
				model: 'Customer'
			}
		})
		.populate('user')
		.exec(function (err, form) {
			req.form = form;
			form.formDate = moment(form.createdAt).format("YYYY-MM-DD");
			next();
		});
}
exports.getCustomerById = function (req, res, next) {
	Customer.model
		.findOne({_id:req.params.customerId})
		.populate('user')
		.exec(function (err, customer) {
		req.customer = customer;
		next();
	});
}

/**
 * Endpoint specific middleware
 */

exports.getFormsByJobId = function (req, res, next) {
	Form.model.find({ job: req.params.jobId })
		.populate({
			path: 'job',
			model: 'Job',
			populate: {
				path: 'customer',
				model: 'Customer'
			}
		})
		.populate('user')
		.exec(function (err, forms) {
			Object.keys(forms).forEach(function (key) {
				forms[key].prettyDate = moment(forms[key].createdAt).format("MMM Do YY");
			});
			req.forms = forms;
			next();
		});
}

exports.getFormsByUserId = function (req, res, next) {
	Form.model.find({ user: req.params.userId })
		.populate({
			path: 'job',
			model: 'Job',
			populate: {
				path: 'customer',
				model: 'Customer'
			}
		})
		.exec(function (err, forms) {
			Object.keys(forms).forEach(function (key) {
				forms[key].prettyDate = moment(forms[key].createdAt).format("MMM Do YY");
			});
			req.forms = forms;
			next();
		});
}

exports.getJobsByCustomerId = function(req,res,next){
	Job.model
		.find({customer:req.params.customerId})
		.populate('user')
		.exec(function (err, jobs) {
			Object.keys(jobs).forEach(function (key) {
				jobs[key].prettyDate = moment(jobs[key].createdAt).format("MMM Do YY");
			});
			req.jobs = jobs;
			next();
		});
}

/**
 * For fetching all upcoming jobs
 */
exports.getUpcomingJobs = function (req, res, next) {
	Job.model.find()
		.populate('user')
		.populate('customer')
		.exec(function (err, jobs) {
			upcoming = [];
			Object.keys(jobs).forEach(function (key) {
				if (moment(jobs[key].createdAt).add(jobs[key].period, 'months').isAfter(moment().subtract(req.user.warningDays, 'days'))) {
					if (moment(jobs[key].createdAt).add(jobs[key].period, 'months').isBefore(moment().add(req.user.warningDays, 'days'))) {
						jobs[key].prettyDate = moment(jobs[key].createdAt).format("MMM Do YY");
						jobs[key].deadline = moment(jobs[key].createdAt).add(jobs[key].period,'months').format("MMM Do YY");
						upcoming.push(jobs[key]);
					}
				}
			});
			req.upcoming = upcoming;
			next();
		});
}

/**
 * Update middleware
 */

exports.updateJob = function(req,res,next){
	Job.model.findById(req.params.jobId).exec(function(err,job){
		job.getUpdateHandler(req).process(req.body,function(err){
			next();
		})
	});
}

exports.updateCustomer = function(req,res,next){
	Customer.model.findById(req.params.customerId).exec(function(err,customer){
		customer.getUpdateHandler(req).process(req.body,function(err){
			next();
		})
	});
}

exports.updateUser = function(req,res,next){
	User.model.findById(req.params.userId).exec(function(err,user){
		user.getUpdateHandler(req).process(req.body,function(err){
			next();
		})
	});
}

exports.updateForm = function(req,res,next){
	req.body.checks = JSON.parse(req.body.attributes);
	console.log(req.body);
	Form.model.findById(req.params.formId).exec(function(err,form){
		form.getUpdateHandler(req).process(req.body,function(err){
			next();
		})
	});
}