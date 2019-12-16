const omj = require('@zerobytes/object-model-js');
const ModelBase = omj.ModelBase;
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;

const Group = require('./Group').default,
	App = require('./App').default;

const shapes = require('../shapes');

/**
 * @type Company
 * @property {string} name
 * @property {string} description
 * @property {string} identificationNumber
 * @property {string} address
 * @property {string} primaryPhone
 * @property {string} secondaryPhone
 * @property {string} primaryEmail
 * @property {string} secondaryEmail
 * @property {string} website
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
		try {
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
				description: {
					type: FieldTypes.String,
					minLength: 10,
					validate: () =>
						validator(this, 'description')
							.isOfType()
							.minLength()
							.isValid()
				},
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
					validate: () =>
						validator(this, 'secondaryEmail')
							.isOfType()
							.email()
							.minLength()
							.isValid()
				},
				website: {
					type: FieldTypes.String,
					validate: () =>
						validator(this, 'website')
							.isOfType()
							.website()
							.minLength()
							.isValid()
				},
				contacts: {
					type: FieldTypes.ArrayOf(FieldTypes.ShapedAs(shapes.contactPerson)),
					validate: () =>
						validator(this, 'contacts')
							.isOfType()
							.notEmpty()
							.notNull()
							.isValid()
				},
				billing: {
					type: FieldTypes.ShapedAs(shapes.billing),
					validate: () =>
						validator(this, 'billing')
							.isOfType()
							.notEmpty()
							.notNull()
							.isValid()
				},
				parent: {
					type: FieldTypes.IdOf(Company),
					validate: () =>
						validator(this, 'parent')
							.isOfType()
							.isValid()
				},
				groups: {
					type: FieldTypes.ArrayOf(FieldTypes.IdOf(Group)),
					validate: () =>
						validator(this, 'groups')
							.isOfType()
							.isValid()
				},
				apps: {
					type: FieldTypes.ArrayOf(FieldTypes.IdOf(App)),
					validate: () =>
						validator(this, 'apps')
							.isOfType()
							.isValid()
				}
			};
		} catch (e) {
			console.log(e);
		}
		this.$fill(properties);
	}
}

exports.default = Company;
