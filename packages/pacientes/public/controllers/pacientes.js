'use strict';

angular.module('mean.pacientes').controller('PacientesController', ['$scope', '$stateParams', '$timeout', 'Upload', '$location', 'Global', 'Pacientes', 'Estudios', 'EstudiosbyPaciente',
  function($scope, $stateParams, $timeout, Upload, $location, Global, Pacientes, Estudios, EstudiosbyPaciente) {
    $scope.global = Global;

    $scope.hasAuthorization = function(paciente) {
/*      if (!paciente || !paciente.user) return false;
      return $scope.global.isAdmin || paciente.user._id === $scope.global.user._id;*/
      return true;
    };

    $scope.globalUser = function(paciente) {
      return $scope.global.user._id;
    }

    $scope.create = function(isValid) {
      if (isValid) {
        var paciente = new Pacientes({
          birthDate: this.birthDate,
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          telephone: this.telephone,
          email: this.email
        });
        paciente.$save(function(response) {
          $location.path('pacientes/' + response._id);
        });

        this.birthDate = '';
        this.firstName = '';
        this.lastName = '';
        this.gender = '';
        this.telephone = '';
        this.email = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(paciente) {
      if (paciente) {
        paciente.$remove();

        for (var i in $scope.pacientes) {
          if ($scope.pacientes[i] === paciente) {
            $scope.pacientes.splice(i, 1);
          }
        }
      } else {
        $scope.paciente.$remove(function(response) {
          $location.path('pacientes');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var paciente = $scope.paciente;
        if (!paciente.updated) {
          paciente.updated = [];
        }
        paciente.updated.push(new Date().getTime());

        paciente.$update(function() {
          $location.path('pacientes/' + paciente._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Pacientes.query(function(pacientes) {
        $scope.pacientes = pacientes;
      });
    };

    $scope.findOne = function() {
      Pacientes.get({
        pacienteId: $stateParams.pacienteId
      }, function(paciente) {
        $scope.paciente = paciente;
      });
    };

    $scope.findEstudiobyPaciente = function() {
      EstudiosbyPaciente.query({pacienteId: $stateParams.pacienteId},
        function(estudios) {
        $scope.estudios = estudios;
    }); 
    };     
    
    $scope.createEstudio = function(isValid, picFile) {
      if (isValid) {
        var paciente = $scope.paciente;
        var estudio = new Estudios({
          imageUrl: this.imageUrl,
          estudioDate: this.estudioDate,
          image:'Vamos Ginasia',
          paciente: paciente._id
        });
        
        Upload.upload({
            url: '/pacientes/'+ paciente._id + '/estudios', 
            method: 'POST', 
            headers: {'Content-Type': 'multipart/form-data'},
            timeout: 15000,
            fields: {estudio: estudio, paciente: paciente},
            file: picFile,               
          }).success(function (response, status) 
            { $location.path('pacientes/' + paciente._id); }).error(function (err) 
            { $scope.error = err.data.message; });
        

        this.imageUrl = '';
        this.estudioDate = '';
      } 

      else {  $scope.submitted = true;  }
    };

  }
]);
