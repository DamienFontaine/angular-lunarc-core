require('./user/UserModule.js');
require('./flash/FlashModule.js');
require('./auth/AuthModule.js');

var app = angular.module('lunarc.core', ['lunarc.auth', 'lunarc.flash', 'lunarc.user']);
