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
		mw.getUpcomingJobs,
		mw.getFormsByCurrentUser,
		mw.getJobsByCurrentUser,
		routes.views.index);
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
		routes.views.endpoint.job.get);
	/*app.get('/forms/:formId',
		mw.getFormById,
		mw.getAllUsers,
		mw.getAllJobs,
		routes.views.endpoint.form.get);*/
	app.get('/customers/:customerId',
		mw.getCustomerById,
		mw.getJobsByCustomerId,
		routes.views.endpoint.customer.get);
	app.get('/users/:userId',
		mw.getFormsByUserId,
		mw.getUserById,
		routes.views.endpoint.user.get);

	/**
	 * Post routes
	 */
	app.post('/forms/:formId/edit',
		mw.updateForm,
		mw.getFormById,
		mw.getAllUsers,
		mw.getAllJobs,
		routes.views.endpoint.form.edit);
	app.post('/jobs/:jobId/edit',
		mw.updateJob,
		mw.getAllUsers,
		mw.getAllCustomers,
		mw.getJobById,
		routes.views.endpoint.job.edit);
	app.post('/customers/:customerId/edit',
		mw.updateCustomer,
		mw.getAllUsers,
		mw.getCustomerById,
		routes.views.endpoint.customer.edit);
	app.post('/users/:userId/edit',
		mw.updateUser,
		mw.getUserById,
		routes.views.endpoint.user.edit);
	/**
	 * Edit routes
	 */
	app.get('/jobs/:jobId/edit',
		mw.getAllUsers,
		mw.getAllCustomers,
		mw.getJobById,
		routes.views.endpoint.job.edit);
	app.get('/customers/:customerId/edit',
		mw.getAllUsers,
		mw.getCustomerById,
		routes.views.endpoint.customer.edit);
	app.get('/users/:userId/edit',
		mw.getUserById,
		routes.views.endpoint.user.edit);
	app.get('/forms/:formId/edit',
		mw.getFormById,
		mw.getAllUsers,
		mw.getAllJobs,
		routes.views.endpoint.form.edit);
};
