'use strict';

//Pacientes service used for pacientes REST endpoint
angular.module('mean.pacientes').factory('Pacientes', ['$resource',
  function($resource) {
    return $resource('pacientes/:pacienteId', {
      pacienteId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
