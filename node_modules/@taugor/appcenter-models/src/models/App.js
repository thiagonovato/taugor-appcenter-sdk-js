const omj = require('@zerobytes/object-model-js');
const ModelBase = omj.ModelBase;
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;

const Company = require('./Company').default;

/**
 * @type App
 * @property {string} name
 * @property {string} description
 * @property {string} mainUrl
 * @property {string[]} companies
 * @property {string} createdBy
 * @property {date} creationDate
 */
class App extends ModelBase {
	constructor(properties = null) {
		super('app');

		this.$fieldConfig = {
			name: {
				type: FieldTypes.String,
				minLength: 2,
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
				minLength: 4,
				validate: () =>
					validator(this, 'description')
						.isOfType()
						.minLength()
						.isValid()
			},
			mainUrl: {
				type: FieldTypes.String,
				minLengh: 6,
				validate: () =>
					validator(this, 'mainUrl')
						.isOfType()
						.notEmpty()
						.notNull()
						.minLength()
						.isValid()
			},
			companies: {
				type: FieldTypes.ArrayOf(FieldTypes.IdOf(Company)),
				validate: () =>
					validator(this, 'companies')
						.isOfType()
						.isValid()
			}
		};

		this.$fill(properties);
	}
}

exports.default = App;
