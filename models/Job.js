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
    //name: {type: Types.Text, required:true, default:'Nýtt verk'},
    customer: {type: Types.Relationship, ref:'Customer', label:'Viðskiptavinur'},
    period: {type: Types.Number, default:6, label:'Tíðni skoðana'},
    createdAt: {type: Date, default: Date.now, label:'Verkþáttur búinn til þann'},
    done: {type: Types.Boolean, default: 'false', label: 'Er verkinu lokið?'},
});

/**
 * Registration
 */
Job.defaultColumns = 'customer, createdAt, done';
Job.register();
