import FieldTypes, { FieldType, ComplexTypes } from './FieldTypes';
import ModelBase from './ModelBase';

/**
 * Validates if a given value is of a given type
 * Types can be a Shape, an Array of any or an InstanceOf
 * @param {FieldType} typeDef
 * @param {any} value
 */
const validateObjectType = (typeDef, value) => {
	if (!(typeDef instanceof FieldType) || value === null || value === undefined) {
		return true;
	}
	let valid = true;
	switch (typeDef.complexType) {
		case ComplexTypes.IdOf:
			if (value === null || value === undefined || value === '') return valid;
			return typeof value === 'string';
		case ComplexTypes.ShapedAs:
			if (typeof value !== 'object') return false;

			Object.keys(new typeDef.Type()).find((prop) => {
				if (prop === '$fieldConfig') return;
				valid = value.hasOwnProperty(prop);
				if (!valid) return prop;
			});
			return valid;

		case ComplexTypes.ArrayOf:
			if (!(value instanceof Array)) return false;

			value.find((item) => {
				if (typeDef.Type instanceof FieldType) {
					valid = validateObjectType(typeDef.Type, item);
				} else if (
					typeof typeDef.Type === 'function' &&
					typeDef.Type.name !== 'Object' &&
					new typeDef.Type() instanceof ModelBase
				) {
					if (typeof item !== 'object') {
						valid = false;
						return item;
					} else {
						valid = true;
						return;
					}
					//TODO: unreachable code here
					let oType = new typeDef.Type();
					Object.keys(oType).find((prop) => {
						if (prop === '$fieldConfig') return;
						if (typeof oType[prop] === 'function') return;
						valid = item.hasOwnProperty(prop);
						if (!valid) return prop;
					});
					if (!valid) return item;
				} else if (typeof typeDef.Type === 'function') {
					valid = item instanceof typeDef.Type;
				} else {
					valid = validateType(typeDef.Type, item);
				}
				if (!valid) return item;
			});
			return valid;
		case ComplexTypes.InstanceOf:
			return value instanceof typeDef.Type;
	}
};

/**
 * Checks if a given value is of a given type
 * @param {string|FieldType} type Can be a String or a FieldType
 * @param {any} value the value to be validated as one of the type defined
 */
const validateType = (type, value) => {
	let valid = true;
	switch (type) {
		case FieldTypes.String:
			valid = typeof value === 'string';
			break;
		case FieldTypes.Integer:
			valid = !Number.isNaN(value);
			break;
		case FieldTypes.Float:
			valid = !Number.isNaN(value);
			break;
		case FieldTypes.Array:
			valid = value instanceof Array;
			break;
		case FieldTypes.Datetime:
			valid = value instanceof Date;
			break;
		case FieldTypes.Date:
			valid = value instanceof Date;
			break;
		case FieldTypes.Time:
			valid = value instanceof Date;
			break;
		case FieldTypes.Boolean:
			valid = typeof value === 'boolean';
			break;
		default:
			if (type instanceof FieldType) {
				valid = validateObjectType(type, value);
			}
			break;
	}
	return valid;
};

export default (model, property) => {
	let value = model[property];
	let config = model.$fieldConfig[property];
	let valid = true;
	let validator;

	let errors = [];
	const addError = (error) => {
		errors.push(error);
	};

	/**
	 * checks if the field value is of the type configured at the model
	 */
	const isOfType = () => {
		valid = validateType(config.type, value);
		if (!valid) addError('wrong-type');
		return validator;
	};
	/**
	 * needs to be a valid email
	 * can be empty
	 */
	const email = () => {
		if (!valid || !value) return validator;
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		valid = !!re.test(value.toLowerCase());
		if (!valid) addError('invalid-email');
		return validator;
	};

	const website = () => {
		if (!valid || !value) return validator;
		let pattern = new RegExp(
			'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
				'(\\#[-a-z\\d_]*)?$',
			'i'
		);
		valid = !!pattern.test(value);
		if (!valid) addError('invalid-website');
		return validator;
	};
	/**
	 * maximum size of the string/array
	 */
	const maxLength = () => {
		if (!valid || !value) return validator;
		if (value && value.length > config.maxLength) valid = false;
		if (!valid) addError('beyond-max-length');
		return validator;
	};
	/**
	 * minimum size of the string/array
	 */
	const minLength = () => {
		if (!valid || !value) return validator;
		if (value.length < config.minLength) valid = false;
		if (!valid) addError('bellow-min-length');
		return validator;
	};
	/**
	 * can not be empty
	 * can be null
	 */
	const notEmpty = () => {
		if (!valid) return validator;
		if (value === null || value === undefined) return validator;
		if (config.type === FieldTypes.Array) {
			if (!(value instanceof Array)) {
				return validator;
			}
			valid = value.length > 0;
		} else if (config.type instanceof FieldType) {
			if (config.type.complexType === ComplexTypes.ShapedAs) {
			}
		} else {
			if (value.toString().trim() === '') {
				valid = false;
			}
		}
		if (!valid) addError('empty');
		return validator;
	};
	/**
	 * can not be null
	 * can be empty
	 */
	const notNull = () => {
		if (!valid) return validator;
		if ((value === null || value === undefined) && value !== '') {
			valid = false;
		}
		if (!valid) addError('null');
		return validator;
	};
	/**
	 * needs to be LESS than specified,
	 * **not even equal**
	 *
	 * @param {number} thresholdValue cut-off limit to this function
	 */
	const lessThan = (thresholdValue) => {
		if (!valid) return validator;
		if (value >= thresholdValue) {
			valid = false;
		}
		if (!valid) addError('more-than-or-equal-to-maximum');
		return validator;
	};
	/**
	 * needs to be MORE than specified,
	 * **not even equal**
	 *
	 * @param {number} thresholdValue cut-off limit to this function
	 */
	const moreThan = (thresholdValue) => {
		if (!valid) return validator;
		if (value <= thresholdValue) {
			valid = false;
		}
		if (!valid) addError('less-than-or-equal-to-minimum');
		return validator;
	};
	/**
	 * needs to be more than zero
	 */
	const moreThanZero = () => {
		if (!valid) return validator;
		if (value <= 0) {
			valid = false;
		}
		if (!valid) addError('zero-or-less');
		return validator;
	};

	const isValid = () => {
		return errors;
	};
	validator = {
		isOfType,
		email,
		website,
		maxLength,
		minLength,
		notEmpty,
		notNull,
		isValid,
		lessThan,
		moreThan,
		moreThanZero
	};
	return validator;
};
