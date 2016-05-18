'use strict';

var pacientes = require('../controllers/pacientes'),
    multiparty = require('connect-multiparty'),
    multipartyMiddleware = multiparty();

// Paciente authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.paciente.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Pacientes, app, auth) {

  app.route('/pacientes')
    .get(auth.requiresLogin, pacientes.all)
    .post(auth.requiresLogin, pacientes.create);
  app.route('/pacientes/:pacienteId')
    .get(auth.requiresLogin, pacientes.show)
    .put(auth.requiresLogin, hasAuthorization, pacientes.update)
    .delete(auth.requiresLogin, hasAuthorization, pacientes.destroy);
  app.route('/pacientes/:pacienteId/estudios')
    .get(auth.requiresLogin, pacientes.showEstudios)
    .post(auth.requiresLogin, multipartyMiddleware, pacientes.createWithUpload);

    
  app.param('pacienteId', pacientes.paciente);
};
