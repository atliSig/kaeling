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
var async = require('async');

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
		{ label: 'Viðskiptavinir', key: 'customers', href: '/customers' },
		{ label: 'Starfsmenn', key: 'users', href: '/users' },
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
			req.currentUserForms = forms;
			next();
		});
}

exports.getJobsByCurrentUser = function (req, res, next) {
	Job.model.find({ user: req.user._id })
		.populate('user')
		.populate('customer')
		.exec(function (err, jobs) {
			req.currentUserJobs = jobs;
			next();
		});
}

/**
 * Middleware for selecting in bulk,
 * consider pagination here later
 */
exports.getAllJobs = function (req, res, next) {
	Job.model.find().populate('customer').exec(function (err, jobs) {
		req.allJobs = jobs;
		next();
	});
}

exports.getAllUsers = function (req, res, next) {
	User.model.find().exec(function (err, users) {
		req.allUsers = users;
		next();
	});
}

exports.getAllCustomers = function (req, res, next) {
	Customer.model.find().exec(function (err, customers) {
		req.allCustomers = customers;
		next();
	});
}

exports.getAllForms = function (req, res, next) {
	var sort = {};
	if(req.query.sort){
		sort[req.query.sort] = req.query.order;
	}else{
		sort['createdAt'] = 1;
	}
	console.log(typeof sort[req.query.sort]);
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
		.sort(sort)
		.exec(function (err, forms) {
			req.allForms = forms;
			next();
		});
}

/**
 * Middleware for endpoints
 */

exports.getJobsByUserId = function (req, res, next) {
	Job.model.find({ user: req.params.userId })
		.populate('user')
		.populate('customer')
		.exec(function (err, jobs) {
			req.jobsByUser = jobs;
			next();
		});
}

exports.getJobById = function (req, res, next) {
	console.log(req.url);
	Job.model.findOne({ _id: req.params.jobId })
		.populate('user')
		.populate('customer')
		.exec(function (err, job) {
			req.jobById = job;
			next();
		});
}
exports.getUserById = function (req, res, next) {
	User.model.findById(req.params.userId, function (err, user) {
		req.userById = user;
		next();
	});
}
exports.getFormById = function (req, res, next) {
	Form.model.findOne({_id:req.params.formId})
		.populate({
			path: 'job',
			model: 'Job',
			populate: [{
				path: 'customer',
				model: 'Customer',
				populate: {
					path:'user',
					model:'User'
				}
			},{
				path: 'user',
				model:'User'
			}]
		})
		.populate('user')
		.exec(function (err, form) {
			req.formById = form;
			next();
		});
}
exports.getCustomerById = function (req, res, next) {
	Customer.model
		.findOne({_id:req.params.customerId})
		.populate('user')
		.exec(function (err, customer) {
		req.customerById = customer;
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
			req.formsByJob = forms;
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
			req.formsByUser = forms;
			next();
		});
}

exports.getJobsByCustomerId = function(req,res,next){
	Job.model
		.find({customer:req.params.customerId})
		.populate('user')
		.exec(function (err, jobs) {
			req.jobsByCustomer = jobs;
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
						upcoming.push(jobs[key]);
					}
				}
			});
			req.upcomingJobs = upcoming;
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
	req.body.measurements = JSON.parse(req.body.measurements);
	Form.model.findById(req.params.formId).exec(function(err,form){
		form.getUpdateHandler(req).process(req.body,function(err){
			next();
		})
	});
}

/**
 * Create middleware
 */

 exports.createForm = function(req,res,next){
	var newForm = new Form.model(req.body);
	newForm.save(function(err){
		req.formId = newForm._id;
		next();
	});
 }

 exports.createJob = function(req,res,next){
	var newJob = new Job.model(req.body);
	newJob.save(function(err){
		req.jobId = newJob._id;
		next();
	});
 }

/**
 * Delete middleware
 */

 exports.deleteForm = function(req,res,next){
	 Form.model
	 	.findById(req.params.formId)
	 	.remove(function(err){
			next();
		 });
 }

 exports.deleteJob = function(req,res,next){
	 Job.model
		 .findById(req.params.jobId)
		 .remove(function(err){
			Form.model
				.find({job:req.params.jobId})
				.remove(function(err){
					next();
				});
		});
 }

/**
 * Session related
 */
/*exports.setSession = function(req,res,next){
	if(_.isEmpty(req.session.allUsers) || _.isEmpty(req.session.allJobs) || _.isEmpty(req.session.allCustomers)){
		Job.model.find().populate('customer').exec(function (err, jobs) {
			req.session.allJobs = jobs;
			User.model.find().exec(function (err, users) {
				req.session.allUsers = users;
				Customer.model.find().exec(function (err, customers) {
					req.session.allCustomers = customers;
					next();
				});
			});
		});
	}else{
		next();
	}
}*/
exports.setSession = function(req,res,next){
	if(_.isEmpty(req.session.allUsers) || _.isEmpty(req.session.allJobs) || _.isEmpty(req.session.allCustomers)){
		Job.model.find().select({_id: 1, name: 1}).exec(function (err, jobs) {
			req.session.jobList = jobs;
			User.model.find().select({_id: 1, name: 1}).exec(function (err, users) {
				req.session.userList = users;
				Customer.model.find().select({_id: 1, name: 1}).exec(function (err, customers) {
					req.session.customerList = customers;
					next();
				});
			});
		});
	}else{
		next();
	}
}


exports.setUsersSession = function(req,res,next){
	User.model
		.find()
		.select({_id: 1, name: 1})
		.exec(function (err, users) {
		req.session.userList = users;
		next();
	});
}

exports.setJobsSession = function(req,res,next){
	Job.model
		.find()
		.select({_id: 1, name: 1})
		.populate('customer').exec(function (err, jobs) {
		req.session.jobList = jobs;
		next();
	});
}

exports.setCustomersSession = function(req,res,next){
	Customer.model
		.find()
		.select({_id: 1, name: 1})
		.exec(function (err, customers) {
		req.session.customerList = customers;
		next();
	});
}