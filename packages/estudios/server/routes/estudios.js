'use strict';

var estudios = require('../controllers/estudios');

// Estudio authorization helpers
var hasAuthorization = function(req, res, next) {
  if (req.estudio.paciente.id !== req.paciente.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

var isAdmin = function (req, res, next){
  if (!req.user.isAdmin()) {
    return res.send(401, 'User is not Admin');
  }
  next();
}

module.exports = function(Estudios, app, auth) {

  app.route('/estudios')
    .get(estudios.all)
    .post(auth.requiresLogin, estudios.createEstudioPaciente);
  app.route('/estudios/:estudioId')
    .get(estudios.show)
    .put(auth.requiresLogin, hasAuthorization, estudios.update)
    .delete(auth.requiresLogin, isAdmin, estudios.destroy);
    
  app.param('estudioId', estudios.estudio);
};
