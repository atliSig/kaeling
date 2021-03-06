var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Customer Model
 * =============
 */

var Customer = new keystone.List('Customer');

Customer.add({
    name: { type: String, required: true, unique: true, initial:true, default:'Nýr viðskiptavinur'},
    //location: {type: Types.Location, required: false, label:'Staðsetning kerfis', enableMapsAPI: true},
    location: {type: String, required: false, label:'Staðsetning kerfis'},
    createdAt: { type: Date, default: Date.now },
    user: {type: Types.Relationship, ref:'User', label:'Búið til af'},
});

Customer.defaultSort = 'name';
Customer.defaultColumns = 'name,location,createdAt';
Customer.register();
