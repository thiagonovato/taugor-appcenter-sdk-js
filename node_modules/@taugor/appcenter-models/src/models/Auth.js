const omj = require('@zerobytes/object-model-js');
const ModelBase = omj.ModelBase;
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;

const User = require('./User').default;
const Company = require('./Company').default;
const App = require('./App').default;

/**
 * @type Auth
 * @property {string} token
 * @property {string} successorToken
 * @property {boolean} expired
 * @property {string} userId
 * @property {string} fromApp
 * @property {string} createdBy
 * @property {date} creationDate
 */
class Auth extends ModelBase {
	constructor(properties = null) {
		super('auth');

		this.$fieldConfig = {
			token: {
				type: FieldTypes.String,
				minLength: 20,
				validate: () =>
					validator(this, 'token')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			successorToken: {
				type: FieldTypes.String,
				validate: () => true
			},
			expired: {
				type: FieldTypes.Boolean,
				defaultValue: false,
				validate: () => true
			},
			userId: {
				type: FieldTypes.IdOf(User),
				validate: () =>
					validator(this, 'userId')
						.isOfType()
						.minLength()
						.notEmpty()
						.notNull()
						.isValid()
			},
			fromApp: {
				type: FieldTypes.IdOf(App),
				validate: () =>
					validator(this, 'fromApp')
						.notNull()
						.notEmpty()
						.isOfType()
						.isValid()
			}
		};

		this.$fill(properties);
	}
}

exports.default = Auth;
