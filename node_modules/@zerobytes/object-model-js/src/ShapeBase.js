import PlainObject from './PlainObject';

class ShapeBase extends PlainObject {
	constructor(data = null) {
		super(data || {});
	}
}

export default ShapeBase;
