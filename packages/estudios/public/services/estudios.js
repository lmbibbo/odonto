'use strict';

//Estudios service used for estudios REST endpoint
angular.module('mean.estudios').factory('Estudios', ['$resource',
  function($resource) {
    return $resource('estudios/:estudioId', {
      estudioId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
