'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Paciente Schema
 */
var PacienteSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  birthDate: {
    type: Date,
    required: false
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: false
  },
  telephone: {
    type: String,
    required: false,
    trim: true
  },
  estudios: [ { 
    created: {
      type: Date,
     default: Date.now
    },
    estudioDate: {
      type: Date,
      required: true
    },
    estudioResolution: {
      type: String,
      required: false
    }
  }],
  email: {
    type: String,
    required: false,
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email']
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});



/**
 * Validations
 */
PacienteSchema.path('firstName').validate(function(firstName) {
  return !!firstName;
}, 'Title cannot be blank');

PacienteSchema.path('lastName').validate(function(firstName) {
  return !!firstName;
}, 'Title cannot be blank');


/**
 * Statics
 */
PacienteSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Paciente', PacienteSchema);

