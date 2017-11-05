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
    name: {
        type: String, 
        required: true, 
        initial:true, 
        default:'Ný skýrsla'},
    user: {
        type: Types.Relationship, 
        ref:'User',
        label:'Starfsmaður',
        initial:true},
    job: {
        type: Types.Relationship,
        ref:'Job',
        label:'yfirverk',
        initial:true},
    createdAt: {
        type: Date,
        default:Date.now},
    systemName: {
        type: String,
        required:false,
        label:'Heiti kerfis'},
    diary: {
        type:Types.Textarea, 
        required:false, 
        label:'Dagbók'},
    measurements:{
        m1:{
            isMeasurement:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Olíuþrýstingur'},
            value: {type: Number, label: 'gildi', default:0},
            unit: {type: String, default:'Bör'}
        },m2:{
            isMeasurement:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Láþrýstingur'},
            value: {type: Number, label: 'gildi', default:0},
            unit: {type: String, default:'Bör'}
        },m3:{
            isMeasurement:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Háþrýstingur'},
            value: {type: Number, label: 'gildi', default:0},
            unit: {type: String, default:'Bör'}
        },m4:{
            isMeasurement:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Yfirhitun'},
            value: {type: Number, label: 'gildi', default:0},
            unit: {type: String, default:'Gráður'}
        },m5:{
            isMeasurement:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Afbræðsla'},
            value: {type: Number, label: 'gildi', default:0},
            unit: {type: String, default:'Amp'}
        }
    },
    checks:{
        at1:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Kælimiðill'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at2:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Olía'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd',default:''}
        },at3:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Sýrupróf'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at4:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Þjappa'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at5:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Tengi'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at6:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Þrýstirofi'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at7:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Olíurofi'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at8:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Þrýstimælar'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at9:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Rakaeyðir'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at10:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Sjónglös'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at11:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Mótorar'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at12:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Rafstýribúnaður'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at13:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Hitaeliment'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at14:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Hitanemi'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at15:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Eimsvali'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at16:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Eimsvalavifta'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at17:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Eimir'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at18:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Eimisvifta'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at19:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Hitaliði'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at20:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Segulloki'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at21:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Þensluloki'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at22:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Afhríming'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at23:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Lekaprófun'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at24:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Aðbúnaður'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at25:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Öryggisloki'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        },at26:{
            isAttribute:{type:Types.Boolean, default:true},
            identifier:{type: String, default:'Vatnsventill'},
            type: {type: String, label: 'Tegund'},
            isOk: {type: Types.Boolean, label:'Í lagi'},
            isFixed: {type: Types.Boolean, label:'Viðgert'},
            comment: {type: String, label: 'Athugasemd', default:''}
        }
    }
});

/**
 * Registration
 */
Form.defaultColumns = 'customer, user, date';
Form.register();
