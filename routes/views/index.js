var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';


	Form = keystone.list('Form');
	Form.model.find()
		.where('ID','59ef8a058caa0046c9f3bbac')
		.exec(function(err,forms){
			//console.log(forms);
			view.render('index');
		});
	// Render the view
	//view.render('index');
};
