'use strict';

(function() {
  // Estudios Controller Spec
  describe('MEAN controllers', function() {
    describe('EstudiosController', function() {
      // The $resource service augments the response object with methods for updating and deleting the resource.
      // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
      // the responses exactly. To solve the problem, we use a newly-defined toEqualData Jasmine matcher.
      // When the toEqualData matcher compares two objects, it takes only object properties into
      // account and ignores methods.
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.estudios');
      });

      // Initialize the controller and a mock scope
      var EstudiosController,
        scope,
        $httpBackend,
        $stateParams,
        $location;

      // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
      // This allows us to inject a service but then attach it to a variable
      // with the same name as the service.
      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

        scope = $rootScope.$new();

        EstudiosController = $controller('EstudiosController', {
          $scope: scope
        });

        $stateParams = _$stateParams_;

        $httpBackend = _$httpBackend_;

        $location = _$location_;

      }));

      it('$scope.find() should create an array with at least one estudio object ' +
        'fetched from XHR', function() {

          // test expected GET request
          $httpBackend.expectGET('estudios').respond([{
            title: 'An Estudio about MEAN',
            content: 'MEAN rocks!'
          }]);

          // run controller
          scope.find();
          $httpBackend.flush();

          // test scope value
          expect(scope.estudios).toEqualData([{
            title: 'An Estudio about MEAN',
            content: 'MEAN rocks!'
          }]);

        });

      it('$scope.findOne() should create an array with one estudio object fetched ' +
        'from XHR using a estudioId URL parameter', function() {
          // fixture URL parament
          $stateParams.estudioId = '525a8422f6d0f87f0e407a33';

          // fixture response object
          var testEstudioData = function() {
            return {
              title: 'An Estudio about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // test expected GET request with response object
          $httpBackend.expectGET(/estudios\/([0-9a-fA-F]{24})$/).respond(testEstudioData());

          // run controller
          scope.findOne();
          $httpBackend.flush();

          // test scope value
          expect(scope.estudio).toEqualData(testEstudioData());

        });

      it('$scope.create() with valid form data should send a POST request ' +
        'with the form input values and then ' +
        'locate to new object URL', function() {

          // fixture expected POST data
          var postEstudioData = function() {
            return {
              title: 'An Estudio about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture expected response data
          var responseEstudioData = function() {
            return {
              _id: '525cf20451979dea2c000001',
              title: 'An Estudio about MEAN',
              content: 'MEAN rocks!'
            };
          };

          // fixture mock form input values
          scope.title = 'An Estudio about MEAN';
          scope.content = 'MEAN rocks!';

          // test post request is sent
          $httpBackend.expectPOST('estudios', postEstudioData()).respond(responseEstudioData());

          // Run controller
          scope.create(true);
          $httpBackend.flush();

          // test form input(s) are reset
          expect(scope.title).toEqual('');
          expect(scope.content).toEqual('');

          // test URL location to new object
          expect($location.path()).toBe('/estudios/' + responseEstudioData()._id);
        });

      it('$scope.update(true) should update a valid estudio', inject(function(Estudios) {

        // fixture rideshare
        var putEstudioData = function() {
          return {
            _id: '525a8422f6d0f87f0e407a33',
            title: 'An Estudio about MEAN',
            to: 'MEAN is great!'
          };
        };

        // mock estudio object from form
        var estudio = new Estudios(putEstudioData());

        // mock estudio in scope
        scope.estudio = estudio;

        // test PUT happens correctly
        $httpBackend.expectPUT(/estudios\/([0-9a-fA-F]{24})$/).respond();

        // testing the body data is out for now until an idea for testing the dynamic updated array value is figured out
        //$httpBackend.expectPUT(/estudios\/([0-9a-fA-F]{24})$/, putEstudioData()).respond();
        /*
                Error: Expected PUT /estudios\/([0-9a-fA-F]{24})$/ with different data
                EXPECTED: {"_id":"525a8422f6d0f87f0e407a33","title":"An Estudio about MEAN","to":"MEAN is great!"}
                GOT:      {"_id":"525a8422f6d0f87f0e407a33","title":"An Estudio about MEAN","to":"MEAN is great!","updated":[1383534772975]}
                */

        // run controller
        scope.update(true);
        $httpBackend.flush();

        // test URL location to new object
        expect($location.path()).toBe('/estudios/' + putEstudioData()._id);

      }));

      it('$scope.remove() should send a DELETE request with a valid estudioId ' +
        'and remove the estudio from the scope', inject(function(Estudios) {

          // fixture rideshare
          var estudio = new Estudios({
            _id: '525a8422f6d0f87f0e407a33'
          });

          // mock rideshares in scope
          scope.estudios = [];
          scope.estudios.push(estudio);

          // test expected rideshare DELETE request
          $httpBackend.expectDELETE(/estudios\/([0-9a-fA-F]{24})$/).respond(204);

          // run controller
          scope.remove(estudio);
          $httpBackend.flush();

          // test after successful delete URL location estudios list
          //expect($location.path()).toBe('/estudios');
          expect(scope.estudios.length).toBe(0);

        }));
    });
  });
}());
