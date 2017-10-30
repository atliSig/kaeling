var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Job Model
 * ==========
 */
var Job = new keystone.List('Job',{
    label: 'Verk',
    singular:'Verk',
    plural: 'Verk',
});

Job.add({
    name: { type: String, required: true, unique: true, initial:true, default:'Nýtt verk'},
    customer: {type: Types.Relationship, ref:'Customer', label:'Viðskiptavinur', initial:true},
    period: {type: Types.Number, default:6, label:'Tíðni skoðana',initial:true},
    createdAt: {type: Date, default: Date.now, label:'Verkþáttur búinn til þann'},
    done: {type: Types.Boolean, default: false, label: 'Er verkinu lokið?'},
    doneNow: {type: Types.Boolean, default: false}

});

/**
 * Registration
 */
Job.defaultColumns = 'customer, createdAt, done';
Job.register();
