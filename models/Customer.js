var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Customer Model
 * =============
 */

var Customer = new keystone.List('Customer');

Customer.add({
    name: { type: String, required: true, unique: true, initial:true},
    location: {type: Types.Location, required: false, label:'Staðsetning kerfis', enableMapsAPI: true},
	createdAt: { type: Date, default: Date.now },
});

Customer.defaultSort = 'name';
Customer.defaultColumns = 'name,location,createdAt';
Customer.register();
