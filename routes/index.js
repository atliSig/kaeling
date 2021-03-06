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
	/**
	 * Ensure user on all routes
	 */
	app.all('*',
		mw.setSession, 
		mw.requireUser
	);
	/**
	 * General routes
	 */
	app.get('/',
		mw.getUpcomingJobs,
		mw.getFormsByUser,
		mw.getJobsByUser,
		routes.views.index.get);
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
	app.get('/forms/:formId',
		mw.getFormById,
		routes.views.endpoint.form.get);
	app.get('/customers/:customerId',
		mw.getCustomerById,
		mw.getJobsByCustomerId,
		routes.views.endpoint.customer.get);
	app.get('/users/:userId',
		mw.getFormsByUser,
		mw.getJobsByUser,
		mw.getUserById,
		routes.views.endpoint.user.get);

	/**
	 * Post routes
	 */
	app.post('/forms/:formId/edit',
		mw.updateForm,
		mw.getFormById,
		routes.views.endpoint.form.editPost);
	app.post('/jobs/:jobId/edit',
		mw.updateJob,
		mw.getJobById,
		mw.setJobsSession,
		routes.views.endpoint.job.editPost);
	app.post('/customers/:customerId/edit',
		mw.updateCustomer,
		mw.setCustomersSession,
		mw.getCustomerById,
		routes.views.endpoint.customer.editPost);
	app.post('/users/:userId/edit',
		mw.updateUser,
		mw.setUsersSession,
		mw.getUserById,
		routes.views.endpoint.user.editPost);
	/**
	 * Edit routes
	 */
	app.get('/jobs/:jobId/edit',
		mw.getJobById,
		routes.views.endpoint.job.editGet);
	app.get('/customers/:customerId/edit',
		mw.getCustomerById,
		routes.views.endpoint.customer.editGet);
	app.get('/users/:userId/edit',
		mw.getUserById,
		routes.views.endpoint.user.editGet);
	app.get('/forms/:formId/edit',
		mw.getFormById,
		routes.views.endpoint.form.editGet);

	/**
	 * Create routes
	 */
	app.post('/create/forms',
		mw.createForm,
		routes.views.endpoint.form.create)	
	app.post('/create/jobs',
		mw.createJob,
		mw.setJobsSession,
		routes.views.endpoint.job.create)
	/**
	 * Delete routes
	 */
	app.get('/forms/:formId/delete',
		mw.deleteForm,
		routes.views.endpoint.form.delete)
	app.get('/jobs/:jobId/delete',
		mw.deleteJob,
		mw.setJobsSession,
		routes.views.endpoint.job.delete)
};
