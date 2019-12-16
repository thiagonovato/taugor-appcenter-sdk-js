"use strict";

var billing = require('./billing');

var contactPerson = require('./contactPerson');

var locationAddress = require('./locationAddress');

var permissionReference = require('./permissionReference');

module.exports = {
  billing: billing,
  contactPerson: contactPerson,
  locationAddress: locationAddress,
  permissionReference: permissionReference
};