'use strict';

angular.module('mean.estudios').controller('EstudiosController', ['$scope', '$stateParams', '$location', 'Global', 'Estudios',
  function($scope, $stateParams, $location, Global, Estudios) {
    $scope.global = Global;

    $scope.hasAuthorization = function(estudio) {

      if (!estudio || !estudio.paciente) return false;
 //     return estudio.paciente._id === $scope.paciente._id;
      return true;
    };

    $scope.isAdmin = function() {
      return $scope.global.isAdmin;
    };

    $scope.globalPaciente = function(estudio) {
      return $scope.global.paciente._id;
    }

    $scope.create = function(isValid) {
      if (isValid) {
        var estudio = new Estudios({
          imageUrl: this.imageUrl
        });
        estudio.$save(function(response) {
          $location.path('estudios/' + response._id);
        });

        this.imageUrl = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(estudio) {
      if (estudio) {
        estudio.$remove();

        for (var i in $scope.estudios) {
          if ($scope.estudios[i] === estudio) {
            $scope.estudios.splice(i, 1);
          }
        }
      } else {
        $scope.estudio.$remove(function(response) {
          $location.path('estudios');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var estudio = $scope.estudio;
        if (!estudio.updated) {
          estudio.updated = [];
        }
        estudio.updated.push(new Date().getTime());

        estudio.$update(function() {
          $location.path('estudios/' + estudio._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Estudios.query(function(estudios) {
        $scope.estudios = estudios;
      });
    };

    $scope.findOne = function() {
      Estudios.get({
        estudioId: $stateParams.estudioId
      }, function(estudio) {
        $scope.estudio = estudio;
      });
    };
  }
]);
