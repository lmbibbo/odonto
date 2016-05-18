'use strict';

//Pacientes service used for pacientes REST endpoint
angular.module('mean.pacientes').factory('EstudiosbyPaciente', ['$resource',
  function($resource) {
    return $resource('pacientes/:pacienteId/estudios', {
      pacienteId: '@_id'}
    );
  }
]);
