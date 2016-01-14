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
