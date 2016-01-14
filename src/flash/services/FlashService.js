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
