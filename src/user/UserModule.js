require('angular-resource');

var app = angular.module('lunarc.user', ['ngResource']);

//Factories
require('./factories/UserFactory.js');

//Services
require('./services/UserService.js');

module.exports = 'lunarc.user';
