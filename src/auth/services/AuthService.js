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
