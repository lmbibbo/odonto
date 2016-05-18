'use strict';

//Setting up route
angular.module('mean.pacientes').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    // states for my app
    $stateProvider
      .state('all pacientes', {
        url: '/pacientes',
        templateUrl: 'pacientes/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create paciente', {
        url: '/pacientes/create',
        templateUrl: 'pacientes/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit paciente', {
        url: '/pacientes/:pacienteId/edit',
        templateUrl: 'pacientes/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('paciente by id', {
        url: '/pacientes/:pacienteId',
        templateUrl: 'pacientes/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('estudios del paciente', {
        url: '/pacientes/:pacienteId/estudios',
        templateUrl: 'pacientes/views/listEstudios.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create estudio-paciente', {
        url: '/pacientes/:pacienteId/estudios/create',
        templateUrl: 'pacientes/views/createEstudio.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })  ;
  }
]);
