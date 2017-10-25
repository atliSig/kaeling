// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'kaeling',
	'brand': 'Kæling',

	'less': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',

	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'mongo': process.env.MONGODB_URI,

	'signin redirect' : '/',
	'signout redirect': '/'
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
});

//Branding related
keystone.set('signin logo', '../images/kaeling-logo.png')

//Google API setting
keystone.set('google api key', process.env.GOOGLE_API_KEY);
//keystone.set('google server api key', process.env.GOOGLE_SERVER_KEY);
keystone.set('default region', 'is');

// Load your project's Routes
keystone.set('routes', require('./routes'));


// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	users: 'users',
	customers: 'customers',
	forms: 'forms'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();
