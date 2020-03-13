const omj = require('@zerobytes/object-model-js');
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;
const ShapeBase = omj.ShapeBase;

/**
 * @type Billing
 * @property {FieldTypes.String} account
 * @property {FieldTypes.String} agency
 * @property {FieldTypes.String} bank
 */
class Billing extends ShapeBase {
	constructor(data = null) {
		super(data);
		this.account = '';
		this.agency = '';
		this.bank = '';
		this.$fieldConfig = {
			account: {
				type: FieldTypes.String,
				minLength: 3,
				validate: () =>
					validator(this, 'account')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			agency: {
				type: FieldTypes.String,
				minLength: 3,
				validate: () =>
					validator(this, 'agency')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			bank: {
				type: FieldTypes.String,
				minLength: 3,
				validate: () =>
					validator(this, 'bank')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			}
		};
	}
}
module.exports = Billing;
