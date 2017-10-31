var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Form Model
 * ==========
 */
var Form = new keystone.List('Form',{
    label: 'Skýrslur',
    singular:'Skýrsla',
    plural: 'Skýrslur',
});

Form.add({
    name: { type: String, required: true, initial:true, default:'Ný skýrsla'},
    user: {type: Types.Relationship, ref:'User', label:'Starfsmaður', initial:true},
    job: {type: Types.Relationship, ref:'Job', label:'yfirverk'},
    customer: {type: Types.Relationship, ref:'Customer', label:'Viðskiptavinur', initial:true},
    date: {type: Date, default:Date.now},
    systemName: {type: String, required:false, label:'Heiti kerfis'},
    q1: {
        whichType: {type: String, label: 'Tegund'},
        isOk: {type: Types.Boolean, label:'Í lagi'},
        isFixed: {type: Types.Boolean, label:'Viðgert'},
        comment: {type: String, label: 'Athugasemd'}
    },
    
});

/**
 * Registration
 */
Form.defaultColumns = 'customer, user, date';
Form.register();
