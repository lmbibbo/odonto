'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Paciente = mongoose.model('Paciente'),
  Estudio = mongoose.model('Estudio'),
  fs = require('fs'),
  _ = require('lodash');

/**
 * Create a Estudio para un paciente with Upload Imagen
 */
exports.createWithUpload = function(req, res) {
 
 var file = req.files.file;
 console.log(file.name);
 console.log(file.type);
 console.log(file.path);
 console.log(req.body.estudio);

// var art = JSON.parse(req.body.estudio);
// var estudio = new Estudio(art);

 fs.readFile(file.path, function (err, original_data) {
  if (err) {
      return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
  } 
    // save image in db as base64 encoded - this limits the image size
    // to there should be size checks here and in client
  var base64Image = original_data.toString('base64');
  fs.unlink(file.path, function (err) {
      if (err) 
        { 
          console.log('failed to delete ' + file.path);  
        }
      else { 
        console.log('successfully deleted ' + file.path); 
      }
  });


  var estudio = new Estudio(req.body.estudio);
//  estudio.paciente = req.paciente._id;
  estudio.image = base64Image;

  estudio.save(function(err) {
    if (err) {
        return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
        });
    } else {
        res.json(estudio);
    }
  });
});
};

/**
 * Find paciente by id
 */
exports.paciente = function(req, res, next, id) {
  Paciente.load(id, function(err, paciente) {
    if (err) return next(err);
    if (!paciente) return next(new Error('Failed to load paciente ' + id));
    req.paciente = paciente;
    next();
  });
};

/**
 * Create an paciente
 */
exports.create = function(req, res) {
  var paciente = new Paciente(req.body);
  paciente.user = req.user;

  paciente.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the paciente'
      });
    }
    res.json(paciente);

  });
};

/**
 * Update an paciente
 */
exports.update = function(req, res) {
  var paciente = req.paciente;

  paciente = _.extend(paciente, req.body);

  paciente.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the paciente'
      });
    }
    res.json(paciente);

  });
};

/**
 * Delete an paciente
 */
exports.destroy = function(req, res) {
  var paciente = req.paciente;

  paciente.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the paciente'
      });
    }
    res.json(paciente);

  });
};

/**
 * Show an paciente
 */
exports.show = function(req, res) {
  res.json(req.paciente);
};


/**
 * Show estudios de un paciente
 */
exports.showEstudios = function(req, res) {
   Estudio.loadEstudiosPaciente(req.paciente, function(err, estudios) {
//    Estudio.find().where('paciente'). sort('-created').populate('paciente', 'pacientes username').exec(function(err, estudios) {

    if (err) {
      return res.json(500, {
        error: 'Cannot list the pacientes'
      });
    }
    req.estudios = estudios;
    res.json(req.estudios);
  });
};

/**
 * List of Pacientes
 */
exports.all = function(req, res) {
  Paciente.find().sort('-created').populate('user', 'name username').exec(function(err, pacientes) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the pacientes'
      });
    }
    res.json(pacientes);

  });
};
