/**
 * Can have a simpler object filled by a "data" object, by means of $fill method
 */
class PlainObject {
	constructor(data) {
		this.$fill(data);
	}
}

PlainObject.prototype.$fieldConfig = {};

/**
 * Applies an object filling based on passed data
 * @param {object} data object contaning the default properties of this model, and its values
 */
PlainObject.prototype.$fill = function(data = null) {
	data = data instanceof Object ? data : {};
	if (data.uid) {
		this.uid = data.uid;
	}
	if (data.createdAt) {
		this.createdAt = data.createdAt;
	}
	if (data.createdBy) {
		this.createdBy = data.createdBy;
	}
	if (data.deleted !== undefined) {
		this.deleted = data.deleted;
	}
	//Creates all the public properties for this object
	//based on the $fieldConfig
	Object.keys(this.$fieldConfig).map((property) => {
		let field = this.$fieldConfig[property];
		this[property] = data[property];
		if (typeof data[property] !== 'boolean' && isNaN(data[property]) && !data[property]) {
			this[property] = field.defaultValue;
			if (
				!field.defaultValue &&
				typeof field.defaultValue !== 'boolean' &&
				isNaN(field.defaultValue)
			) {
				this[property] = '';
			}
		}
	});

	return this;
};
/**
 * Returns a plain object based on the $fieldConfig properties
 */
PlainObject.prototype.$toPlainObject = function() {
	let plain = {};
	if (this.uid) {
		plain.uid = this.uid;
	}
	if (this.deleted !== undefined) {
		plain.deleted = this.deleted;
	}
	if (this.createdAt) {
		plain.createdAt = this.createdAt;
	}
	if (this.createdBy) {
		plain.createdBy = this.createdBy;
	}
	Object.keys(this.$fieldConfig).map((property) => {
		plain[property] = this[property];
	});
	return plain;
};

/**
 * Validates each field of this model,
 * according to their own validation method
 */
PlainObject.prototype.$validate = function() {
	let errors = {};
	Object.keys(this.$fieldConfig).find((property) => {
		let field = this.$fieldConfig[property];
		let validation = field.validate();
		if (validation.length) {
			errors[property] = validation;
		}
	});
	return errors;
};

export default PlainObject;
