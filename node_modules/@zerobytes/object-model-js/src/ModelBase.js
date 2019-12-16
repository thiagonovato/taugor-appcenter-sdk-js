const BasicService = require('@zerobytes/firebase-basic-service').BasicService;
const PlainObject = require('./PlainObject').default;

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
		defaultObject[property] = field.defaultValue || '';
	});

	return BasicService({
		firebase,
		collection: this.getModelName(),
		defaultObject,
		store,
		reducerName: reducerName || this.getModelName()
	});
};

exports.default = ModelBase;
