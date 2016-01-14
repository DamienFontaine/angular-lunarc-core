(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./user/UserModule.js');
require('./flash/FlashModule.js');
require('./auth/AuthModule.js');

var app = angular.module('lunarc.core', ['lunarc.auth', 'lunarc.flash', 'lunarc.user']);

},{"./auth/AuthModule.js":2,"./flash/FlashModule.js":4,"./user/UserModule.js":6}],2:[function(require,module,exports){
require('angular-jwt');

var app = angular.module('lunarc.auth', ['angular-jwt', 'lunarc.user']);

//Services
require('./services/AuthService.js');

module.exports = 'lunarc.auth';

},{"./services/AuthService.js":3,"angular-jwt":"angular-jwt"}],3:[function(require,module,exports){
/**
 * @ngdoc service
 * @name lunarc.auth.AuthService
 * @requires jwtHelper
 * @requires lunarc.user.User
 * @description
 *
 * Service d'authentification
 */
angular.module('lunarc.auth').factory('AuthService', ['jwtHelper', 'User', function(jwtHelper, User) {
  return {
    user: null,
    /**
     * @ngdoc method
     * @name setCredentials
     * @methodOf lunarc.auth.AuthService
     * @description
     *
     * Affectation du token...
     */
    setCredentials: function() {
      var expToken = localStorage.getItem('id_token');
      var tokenPayload = jwtHelper.decodeToken(expToken);
      this.user = new User(tokenPayload.id, tokenPayload.username, tokenPayload.email);
    },
    /**
     * @ngdoc method
     * @name storeToken
     * @methodOf lunarc.auth.AuthService
     * @description
     *
     * Stockage le token
     *
     * @param {string} id_token Identifiant du token
     */
    storeToken: function(id_token) {
      localStorage.setItem('id_token', id_token);
      this.setCredentials();
    },
    /**
     * @ngdoc method
     * @name isAuthenticated
     * @methodOf lunarc.auth.AuthService
     * @description
     *
     * Retourne vrai si l'utilisateur est authentifié.
     */
    isAuthenticated: function() {
      var expToken = localStorage.getItem('id_token');
      try {
        var tokenPayload = jwtHelper.decodeToken(expToken);
        if (jwtHelper.isTokenExpired(expToken)) {
          this.user = null;
          return false;
        }
        this.setCredentials();
      } catch (err) {
        return false;
      }
      return true;
    }
  };
}]);

},{}],4:[function(require,module,exports){
var app = angular.module('lunarc.flash', []);

//Services
require('./services/FlashService.js');

module.exports = 'lunarc.flash';

},{"./services/FlashService.js":5}],5:[function(require,module,exports){
/**
 * @ngdoc service
 * @name lunarc.flash.FlashService
 * @requires $rootScope
 * @description
 *
 * Service de message Flash
 */
 angular.module('lunarc.flash').factory("FlashService", ['$rootScope', function($rootScope) {
   var queue = [],
     currentMessage = '';

   $rootScope.$on('$locationChangeStart', function(event) {
     currentMessage = queue.shift() || '';
   });

   return {
     /**
      * @ngdoc method
      * @name set
      * @methodOf lunarc.flash.FlashService
      * @description
      *
      * Stockage du message
      *
      * @param {string} message Message
     **/
     set: function(message) {
       queue.push(message);
     },
     /**
      * @ngdoc method
      * @name get
      * @methodOf lunarc.flash.FlashService
      * @description
      *
      * Retourne le message courrant. Si le message est vide et
      * qu'il reste encore des messages dans la queue, alors il
      * retourne le dernier message de la queue.
      *
      * @returns {string} Le message
     **/
     get: function() {
       if(queue.length > 0){
         currentMessage = queue.shift();
       }
       return currentMessage;
     },
     /**
      * @ngdoc method
      * @name clear
      * @methodOf lunarc.flash.FlashService
      * @description
      *
      * Efface le message
     **/
     clear: function() {
       currentMessage = '';
     }
   };
 }]);

},{}],6:[function(require,module,exports){
require('angular-resource');

var app = angular.module('lunarc.user', ['ngResource']);

//Factories
require('./factories/UserFactory.js');

//Services
require('./services/UserService.js');

module.exports = 'lunarc.user';

},{"./factories/UserFactory.js":7,"./services/UserService.js":8,"angular-resource":"angular-resource"}],7:[function(require,module,exports){
/**
 * @ngdoc service
 * @name lunarc.user.User
 * @description
 *
 * Utiliasteur de Lunarc
 */
angular.module('lunarc.user').factory('User', [function() {

  var User = function(id, username, email) {
    this.id = id;
    this.username = username;
    this.email = email;
  };

  return User;
}]);

},{}],8:[function(require,module,exports){
/**
 * @ngdoc service
 * @name lunarc.user.UserService
 * @requires $resource
 * @description
 *
 * Service pour accéder aux utilisateurs.
 */
angular.module('lunarc.user').factory("UserService", ['$resource', function($resource){
  return $resource('/user/:Id', {Id:'@ID'},
  {
    update: { method: 'PUT', params: {
      Id: '@ID'
    }}
  });
}]);

},{}]},{},[1]);
