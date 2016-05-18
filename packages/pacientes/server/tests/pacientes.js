'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Paciente = mongoose.model('Paciente');

/**
 * Globals
 */
var user;
var paciente;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Paciente:', function() {
    beforeEach(function(done) {
      user = new User({
        name: 'Full name',
        email: 'test@test.com',
        username: 'user',
        password: 'password'
      });

      user.save(function() {
        paciente = new Paciente({
          firstName: 'Paciente Nombre',
          lastName: 'Paciente Apellido',
          user: user
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return paciente.save(function(err) {
          should.not.exist(err);
          paciente.firstName.should.equal('Paciente Nombre');
          paciente.lastName.should.equal('Paciente Apellido');
          paciente.user.should.not.have.length(0);
          paciente.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without firstName', function(done) {
        paciente.firstName = '';

        return paciente.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without lastName', function(done) {
        paciente.lastName = '';

        return paciente.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without user', function(done) {
        paciente.user = {};

        return paciente.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      paciente.remove();
      user.remove();
      done();
    });
  });
});
