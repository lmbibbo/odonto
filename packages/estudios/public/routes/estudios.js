'use strict';

//Setting up route
angular.module('mean.estudios').config(['$stateProvider',
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
      .state('all estudios', {
        url: '/estudios',
        templateUrl: 'estudios/views/list.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('create estudio', {
        url: '/estudios/create',
        templateUrl: 'estudios/views/create.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('edit estudio', {
        url: '/estudios/:estudioId/edit',
        templateUrl: 'estudios/views/edit.html',
        resolve: {
          loggedin: checkLoggedin
        }
      })
      .state('estudio by id', {
        url: '/estudios/:estudioId',
        templateUrl: 'estudios/views/view.html',
        resolve: {
          loggedin: checkLoggedin
        }
      });
  }
]);
