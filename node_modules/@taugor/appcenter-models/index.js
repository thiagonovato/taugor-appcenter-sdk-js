//Models for export
const Auth = require('./src/models/Auth').default;
const App = require('./src/models/App').default;
const Billing = require('./src/models/Billing').default;
const Company = require('./src/models/Company').default;
const Group = require('./src/models/Group').default;
const Permission = require('./src/models/Permission').default;
const User = require('./src/models/User').default;

//Shapes for export
const shapes = require('./src/shapes');
const billing = shapes.billing;
const contactPerson = shapes.contactPerson;
const demoMode = shapes.demoMode;
const locationAddress = shapes.locationAddress;
const permissionReference = shapes.permissionReference;

module.exports = {
	Auth,
	App,
	Billing,
	Company,
	Group,
	Permission,
	User,
	billing,
	contactPerson,
	demoMode,
	locationAddress,
	permissionReference
};
