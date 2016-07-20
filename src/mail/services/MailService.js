/**
 * @ngdoc service
 * @name lunarc.mail.MailService
 * @description
 *
 * Service pour envoyer des emails.
 */
angular.module('lunarc.mail').factory("MailService", ['$http', function($http) {
    return {
      /**
       * @ngdoc method
       * @name send
       * @methodOf lunarc.mail.MailService
       * @description
       *
       * Envoie un email
       *
       * @param {object} mail Email
      **/
      send: function(mail){
        $http({
          method: 'POST',
          url: '/mail',
          data: mail
        });
      }
    };
}]);
