'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Paciente = mongoose.model('Paciente'),
  Estudio = mongoose.model('Estudio');

/**
 * Globals
 */
var paciente;
var estudio;

/**
 * Test Suites
 */
describe('<Unit Test>', function() {
  describe('Model Estudio:', function() {
    beforeEach(function(done) {
      paciente = new Paciente({
        name: 'Full name',
        email: 'test@test.com'
      });

      paciente.save(function() {
        estudio = new Estudio({
          imageUrl: 'Estudio URL',
          paciente: paciente
        });

        done();
      });
    });

    describe('Method Save', function() {
      it('should be able to save without problems', function(done) {
        return estudio.save(function(err) {
          should.not.exist(err);
          estudio.imageUrl.should.equal('Estudio URL');
          estudio.paciente.should.not.have.length(0);
          estudio.created.should.not.have.length(0);
          done();
        });
      });

      it('should be able to show an error when try to save without firstName', function(done) {
        estudio.firstName = '';

        return estudio.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without lastName', function(done) {
        estudio.lastName = '';

        return estudio.save(function(err) {
          should.exist(err);
          done();
        });
      });

      it('should be able to show an error when try to save without paciente', function(done) {
        estudio.paciente = {};

        return estudio.save(function(err) {
          should.exist(err);
          done();
        });
      });

    });

    afterEach(function(done) {
      estudio.remove();
      paciente.remove();
      done();
    });
  });
});
