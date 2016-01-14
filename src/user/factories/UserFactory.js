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
