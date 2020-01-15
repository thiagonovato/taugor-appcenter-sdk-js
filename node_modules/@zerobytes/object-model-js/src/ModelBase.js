import { BasicService } from '@zerobytes/firebase-basic-service';
import PlainObject from './PlainObject';
import FieldTypes from './FieldTypes';

/**
 * Holds a standard functional object which can be validated automatically
 */
class ModelBase extends PlainObject {
	/**
	 * @param {string} modelName collection at firestore
	 * @param {object} data Object containing the property values of this model
	 */
	constructor(modelName, data) {
		super(data);
		const _modelName = modelName;
		this.getModelName = () => _modelName;
	}
}

/**
 * Returns an instance of BasicService which gives access to several methods
 * regarding firebase.firestore actions.
 * save/patch/get/list/filter/order/limit
 */
ModelBase.prototype.getService = function(firebase, store, reducerName) {
	let defaultObject = {};
	Object.keys(this.$fieldConfig).map((property) => {
		let field = this.$fieldConfig[property];
		switch (field.type) {
			case FieldTypes.Boolean:
				defaultObject[property] = field.defaultValue;
				break;
			default:
				defaultObject[property] = field.defaultValue || '';
				break;
		}
	});

	return BasicService({
		firebase,
		collection: this.getModelName(),
		defaultObject,
		store,
		reducerName: reducerName || this.getModelName()
	});
};

export default ModelBase;
