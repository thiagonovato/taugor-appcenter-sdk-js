const omj = require('@zerobytes/object-model-js');
const FieldTypes = omj.FieldTypes;
const validator = omj.Validator;
const ShapeBase = omj.ShapeBase;

/**
 * @type PermissionReference
 * @property {FieldTypes.String} uid
 * @property {FieldTypes.Boolean} active
 */
class PermissionReference extends ShapeBase {
	constructor(data = null) {
		super(data);
		this.uid = '';
		this.active = true;
		this.$fieldConfig = {
			uid: {
				type: FieldTypes.String,
				validate: () =>
					validator(this, 'uid')
						.isOfType()
						.notNull()
						.notEmpty()
						.isValid()
			},
			active: {
				type: FieldTypes.Boolean,
				defaultValue: true,
				validate: () =>
					validator(this, 'active')
						.isOfType()
						.isValid()
			}
		};

		this.$fill(properties);
	}
}

module.exports = PermissionReference;
