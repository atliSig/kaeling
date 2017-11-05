/**
 * Index for a customer
 */

var keystone = require('keystone');
var moment = require('moment');

module.exports.get = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	selected = [];
	Object.keys(req.jobsByCustomer).forEach(function(key) {
		selected.push({
			'link':req.jobsByCustomer[key]._id,
			'name':req.jobsByCustomer[key].name,
			'user':req.jobsByCustomer[key].user.name,
			'date':moment(req.jobsByCustomer[key].createdAt).format("MMM Do YY"),
			});
	});
	helpTitle = 'Yfirlitssíða viðskiptavinar';
	helpBody =
		'Hér er hægt að skoða allar helstu upplýsingar um viðskiptavinin og breyta'+
		' upplýsingum ef þess þarf. Hér er einnig yfirlit yfir öll þau verkefni sem'+
		' eru skráð á fyrirtækið.';
	view.render('customer', {
		currentUser: req.user,
		type:'jobs',
		customer: req.customerById,
		selected:selected,
		titles:['Nafn', 'Eigandi','Dagsetning'],
		keys:['name','user','date'],
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
};

module.exports.edit = function(req,res){
	var view = new keystone.View(req, res);
	var locals = res.locals;
	helpTitle = 'Breytingarsíða viðskiptavinar';
	helpBody =
		'Hér er hægt að gera nákvæmari breytingar á þeim upplýsingum sem eru skráð'+
		' á viðeigandi fyrirtæki.';
	view.render('edit/editcustomer', {
		currentUser: req.user,
		customer: req.customerById, 
		users:req.session.allUsers,
		customers:req.session.allCustomers,
		jobs:req.session.allJobs,
		helpBody:helpBody,
		helpTitle:helpTitle
	});
}

exports = module.exports;
