const omj = require('@zerobytes/object-model-js');
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;
const ShapeBase = omj.ShapeBase;

/**
 * @type ContactPerson
 * @property {FieldTypes.String} name
 * @property {FieldTypes.String} phoneNumber
 * @property {FieldTypes.String} email
 * @property {FieldTypes.String} address
 * @property {FieldTypes.String} website
 */
class ContactPerson extends ShapeBase {
	constructor(data = null) {
		super(data);
		this.name = '';
		this.phoneNumber = '';
		this.email = '';
		this.address = '';
		this.website = '';
		this.$fieldConfig = {
			name: {
				type: FieldTypes.String,
				minLength: 3,
				validate: () =>
					validator(this, 'name')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			phoneNumber: {
				type: FieldTypes.String,
				minLength: 8,
				validate: () =>
					validator(this, 'phoneNumber')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			email: {
				type: FieldTypes.String,
				transform: (model, value) =>
					!!value && typeof value === 'string' ? value.trim().toLowerCase() : value,
				minLength: 10,
				validate: () =>
					validator(this, 'email')
						.isOfType()
						.minLength()
						.email()
						.notEmpty()
						.notNull()
						.isValid()
			},
			address: {
				type: FieldTypes.String,
				minLength: 10,
				validate: () =>
					validator(this, 'address')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			website: {
				type: FieldTypes.String,
				transform: (model, value) =>
					!!value && typeof value === 'string' ? value.trim().toLowerCase() : value,
				minLength: 3,
				validate: () =>
					validator(this, 'website')
						.isOfType()
						.website()
						.isValid()
			}
		};
	}
}

module.exports = ContactPerson;
