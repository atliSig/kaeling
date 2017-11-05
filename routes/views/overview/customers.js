/**
 * Shows a list of all customers
 */

var keystone = require('keystone');
var moment = require('moment');
exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	locals.section = 'customers';	
	helpTitle = 'Yfirlitssíða viðskiptavina';
	helpBody =
		'Hér er hægt að nálgast alla viðskiptavini sem eru skráðir í kerfinu';
	selected = [];
	Object.keys(req.session.allCustomers).forEach(function(key) {
		selected.push({
			'link':req.session.allCustomers[key]._id,
			'name':req.session.allCustomers[key].name,
			'location':req.session.allCustomers[key].location.street1+', '+req.session.allCustomers[key].location.suburb,
			'date':moment(req.session.allCustomers[key].createdAt).format("MMM Do YY")});
	});
	view.render('overview', {
		currentUser: req.user,
		type:'customers',
		selected:selected,
		titles:['Fyrirtæki','Staður','Fært inn'],
		keys:['name','location','date'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
};
