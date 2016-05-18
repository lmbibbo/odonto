'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Estudio = mongoose.model('Estudio'),
  _ = require('lodash');


/**
 * Find estudio by id
 */
exports.estudio = function(req, res, next, id) {
  Estudio.load(id, function(err, estudio) {
    if (err) return next(err);
    if (!estudio) return next(new Error('Failed to load estudio ' + id));
    req.estudio = estudio;
    next();
  });
};

/**
 * Create an estudio
 */
exports.create = function(req, res) {
  var estudio = new Estudio(req.body);
  estudio.paciente = req.paciente;
  estudio.imagen = 'hola';

  estudio.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the estudio en funcion Create'
      });
    }
    res.json(estudio);
  });
};

/**
 * Update an estudio
 */
exports.update = function(req, res) {
  var estudio = req.estudio;

  estudio = _.extend(estudio, req.body);

  estudio.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the estudio'
      });
    }
    res.json(estudio);

  });
};

/**
 * Delete an estudio
 */
exports.destroy = function(req, res) {
  var estudio = req.estudio;

  estudio.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the estudio'
      });
    }
    res.json(estudio);

  });
};

/**
 * Show an estudio 
 */
exports.show = function(req, res) {
  res.json(req.estudio);
};

/**
 * List of Estudios
 */
exports.all = function(req, res) {
  Estudio.find().sort('-created').populate('paciente', 'name pacientename').exec(function(err, estudios) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the estudios'+err 
      });
    }
    res.json(estudios);

  });
};

exports.findbyPaciente = function(req, res) {
  Estudio.loadEstudiosPaciente();
  if (err) {
    return res.json(500, {
      error: 'Cannot load estudios '+err
      });
    }
    res.json(estudio);
  };


exports.createEstudioPaciente = function(req, res) {
  var estudio = new Estudio(req.body);
  estudio.imagen = 'hola';

  estudio.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the estudio'+err
      });
    }
    res.json(estudio);

  });
};
