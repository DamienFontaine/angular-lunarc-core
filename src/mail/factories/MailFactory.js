/**
 * @ngdoc service
 * @name lunarc.mail.Mail
 * @description
 *
 * Email
 */
angular.module('lunarc.mail').factory('Mail', [function() {

  var Mail = function(message, to, from) {
    this.message = message;
    this.to = to;
    this.from = from || "";
  };

  return Mail;
}]);
