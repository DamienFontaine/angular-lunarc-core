require('angular-jwt');

var app = angular.module('lunarc.auth', ['angular-jwt', 'lunarc.user']);

//Services
require('./services/AuthService.js');

module.exports = 'lunarc.auth';
