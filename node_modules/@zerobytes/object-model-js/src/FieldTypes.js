class FieldType {
	constructor(complexType, Type) {
		this.complexType = complexType;
		this.Type = Type;
	}
}
const ComplexTypes = {
	ShapedAs: 'ShapedAs',
	ArrayOf: 'ArrayOf',
	InstanceOf: 'InstanceOf',
	IdOf: 'IdOf'
};

export { FieldType };
export { ComplexTypes };

export default {
	String: 'string',
	Integer: 'integer',
	Float: 'float',
	Array: 'array',
	Datetime: 'datetime',
	Date: 'date',
	Time: 'time',
	Boolean: 'boolean',
	Object: 'object',
	ShapedAs: (Type) => {
		return new FieldType(ComplexTypes.ShapedAs, Type);
	},
	ArrayOf: (Type) => {
		return new FieldType(ComplexTypes.ArrayOf, Type);
	},
	InstanceOf: (Type) => {
		return new FieldType(ComplexTypes.InstanceOf, Type);
	},
	IdOf: (ModelBase) => {
		return new FieldType(ComplexTypes.IdOf, ModelBase);
	}
};
