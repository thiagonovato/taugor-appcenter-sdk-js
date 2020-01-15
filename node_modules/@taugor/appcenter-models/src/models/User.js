const omj = require('@zerobytes/object-model-js');
const ModelBase = omj.ModelBase;
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;

const Company = require('./Company').default,
	Group = require('./Group').default,
	Permission = require('./Permission').default;

const shapes = require('../shapes');

/**
 * @type User
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} provider
 * @property {array<any>} addresses
 * @property {string} birthdate
 * @property {string} user
 * @property {string} email
 * @property {string} phone
 * @property {string} phoneArea
 * @property {string} phoneCountry
 * @property {string} taxDocument
 * @property {string} createdBy
 * @property {date} creationDate
 */
class User extends ModelBase {
	constructor(properties = null) {
		super('user');

		this.$fieldConfig = {
			firstName: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'firstName')
						.isOfType()
						.notEmpty()
						.notNull()
						.isValid()
			},
			lastName: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'lastName')
						.isOfType()
						.notEmpty()
						.notNull()
						.isValid()
			},
			provider: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'provider')
						.isOfType()
						.notEmpty()
						.notNull()
						.isValid()
			},
			addresses: {
				type: FieldTypes.ArrayOf(FieldTypes.ShapedAs(shapes.locationAddress)),
				validate: () =>
					validator(this, 'addresses')
						.isOfType()
						.notNull()
						.notEmpty()
						.isValid()
			},
			birthdate: {
				type: FieldTypes.Date,
				validate: () =>
					validator(this, 'provider')
						.isOfType()
						.notEmpty()
						.notNull()
						.isValid()
			},
			user: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'user')
						.isOfType()
						.notEmpty()
						.notNull()
						.isValid()
			},
			email: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'email')
						.isOfType()
						.notEmpty()
						.notNull()
						.email()
						.isValid()
			},
			taxDocument: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'taxDocument')
						.isOfType()
						.isValid()
			},
			phoneCountry: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'phoneCountry')
						.isOfType()
						.isValid()
			},
			phoneArea: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'phoneArea')
						.isOfType()
						.isValid()
			},
			phone: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'phone')
						.isOfType()
						.notEmpty()
						.notNull()
						.isValid()
			},
			companies: {
				type: FieldTypes.ArrayOf(FieldTypes.IdOf(Company)),
				validate: () =>
					validator(this, 'companies')
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
			permissions: {
				type: FieldTypes.ArrayOf(FieldTypes.IdOf(Permission)),
				validate: () =>
					validator(this, 'permissions')
						.isOfType()
						.isValid()
			}
		};

		this.$fill(properties);
	}
}

exports.default = User;
