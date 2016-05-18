'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Estudio Schema
 */
var EstudioSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  estudioDate: {
    type: Date,
    required: false
  },
  imageHeight: {
    type: String,
    required: false
  },
  image:{ 
    type: String, 
    default: ''
  },
  imageWidth: {
    type: String,
    required: false
  },
  imageUrl: {
    type: String,
    required: false
  },
  estudioResolution: {
    type: String,
    required: false
  },
  estudioEscala: {
    type: String,
    required: false
  },
  paciente: {
    type: Schema.ObjectId,
    ref: 'Paciente'
  }
});


/**
 * Statics
 */
EstudioSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('paciente').exec(cb);
};

EstudioSchema.statics.loadEstudiosPaciente = function(paciente, cb) {
  this.find({paciente: paciente}).populate('paciente').exec(cb);
};

mongoose.model('Estudio', EstudioSchema);
