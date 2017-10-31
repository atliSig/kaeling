/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var mw = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', mw.initLocals);
keystone.pre('render', mw.flashMessages);

// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Ensure user on all routes
	app.all('*', mw.requireUser);
	/**
	 * General routes
	 */
	app.get('/',
		mw.getFormsByUser,
		mw.getJobsByUser,
		routes.views.index);
	// Upcoming jobs
	app.get('/upcoming',
		mw.getUpcoming,
		mw.setCustomers,
		routes.views.upcoming);
	/**
	 * Overview routes
	 */	
	app.get('/jobs',
		mw.getAllJobs,
		routes.views.overview.jobs);
	app.get('/customers',
		mw.getAllCustomers,
		routes.views.overview.customers);
	app.get('/forms',
		mw.getAllForms,
		routes.views.overview.forms);
	app.get('/users',
		mw.getAllUsers,
		routes.views.overview.users);

	/**
	 * Endpoint routes
	 */
	app.get('/jobs/:jobId',
		mw.getJobById,
		mw.getFormsByJobId,
		routes.views.endpoint.job);
	app.get('/forms/:formId',
		mw.getFormById,
		routes.views.endpoint.form);
	app.get('/customers/:customerId',
		mw.getCustomerById,
		routes.views.endpoint.customer);
	app.get('/users/:userId',
		mw.getUserById,
		routes.views.endpoint.user);
};
