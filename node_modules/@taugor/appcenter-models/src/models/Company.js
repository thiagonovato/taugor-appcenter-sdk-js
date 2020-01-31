const omj = require('@zerobytes/object-model-js');
const ModelBase = omj.ModelBase;
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;

const Group = require('./Group').default,
	App = require('./App').default,
	User = require('./User').default;

const shapes = require('../shapes');

/**
 * @type Company
 * @property {string} name
 * @property {string} code
 * @property {string} description
 * @property {string} identificationNumber
 * @property {string} address
 * @property {string} primaryPhone
 * @property {string} secondaryPhone
 * @property {string} primaryEmail
 * @property {string} secondaryEmail
 * @property {string} website
 * @property {string} owner
 * @property {array}  contacts
 * @property {object} billing
 * @property {string} parent
 * @property {array} groups
 * @property {array} apps
 * @property {string} createdBy
 * @property {date} creationDate
 */
class Company extends ModelBase {
	constructor(properties = null) {
		super('company');

		this.$fieldConfig = {
			identificationNumber: {
				type: FieldTypes.String,
				minLengh: 10,
				validate: () =>
					validator(this, 'identificationNumber')
						.isOfType()
						.notEmpty()
						.notNull()
						.minLength()
						.isValid()
			},
			name: {
				type: FieldTypes.String,
				order: true,
				minLength: 3,
				validate: () =>
					validator(this, 'name')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			fantasyName: {
				type: FieldTypes.String,
				order: true,
				minLength: 3,
				validate: () =>
					validator(this, 'fantasyName')
						.isOfType()
						.minLength()
						.isValid()
			},
			code: {
				type: FieldTypes.String,
				minLength: 1,
				validate: () =>
					validator(this, 'code')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			description: {
				type: FieldTypes.String,
				minLength: 10,
				validate: () =>
					validator(this, 'description')
						.isOfType()
						.minLength()
						.isValid()
			},
			address: {
				type: FieldTypes.String,
				minLengh: 10,
				validate: () =>
					validator(this, 'address')
						.isOfType()
						.notEmpty()
						.notNull()
						.minLength()
						.isValid()
			},
			primaryPhone: {
				type: FieldTypes.String,
				minLength: 8,
				validate: () =>
					validator(this, 'primaryPhone')
						.isOfType()
						.notEmpty()
						.notNull()
						.minLength()
						.isValid()
			},
			secondaryPhone: {
				type: FieldTypes.String,
				minLength: 8,
				validate: () =>
					validator(this, 'secondaryPhone')
						.isOfType()
						.minLength()
						.isValid()
			},
			primaryEmail: {
				type: FieldTypes.String,
				transform: (model, value) =>
					!!value && typeof value === 'string' ? value.trim().toLowerCase() : value,
				validate: () =>
					validator(this, 'primaryEmail')
						.isOfType()
						.email()
						.notEmpty()
						.notNull()
						.minLength()
						.isValid()
			},
			secondaryEmail: {
				type: FieldTypes.String,
				transform: (model, value) =>
					!!value && typeof value === 'string' ? value.trim().toLowerCase() : value,
				validate: () =>
					validator(this, 'secondaryEmail')
						.isOfType()
						.email()
						.isValid()
			},
			website: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'website')
						.isOfType()
						.website()
						.isValid()
			},
			paymentOk: {
				type: FieldTypes.Boolean,
				defaultValue: false,
				validate: () => true
			},
			demoMode: {
				type: FieldTypes.ShapedAs(shapes.demoMode),
				defaultValue: new shapes.demoMode({ active: false }),
				validate: () => true
			},
			owner: {
				type: FieldTypes.IdOf(User),
				validate: () =>
					validator(this, 'owner')
						.isOfType()
						.isValid()
			},
			contacts: {
				type: FieldTypes.ArrayOf(FieldTypes.ShapedAs(shapes.contactPerson)),
				defaultValue: [],
				validate: () =>
					validator(this, 'contacts')
						.isOfType()
						.isValid()
			},
			billing: {
				type: FieldTypes.ShapedAs(shapes.billing),
				validate: () =>
					validator(this, 'billing')
						.isOfType()
						.isValid()
			},
			parent: {
				type: FieldTypes.IdOf(Company),
				validate: () => true
				// validator(this, 'parent')
				// 	.isOfType()
				// 	.isValid()
			},
			groups: {
				type: FieldTypes.ArrayOf(FieldTypes.IdOf(Group)),
				defaultValue: [],
				validate: () => true
				// validator(this, 'groups')
				// 	.isOfType()
				// 	.isValid()
			},
			apps: {
				type: FieldTypes.ArrayOf(FieldTypes.IdOf(App)),
				defaultValue: [],
				// transform: (model, value) => value.map((item) => new AppReference(item)),
				validate: () => true
				// validator(this, 'apps')
				// 	.isOfType()
				// 	.isValid()
			}
		};

		this.$fill(properties);
	}
}

exports.default = Company;
