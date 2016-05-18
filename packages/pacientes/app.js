'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Pacientes = new Module('pacientes');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Pacientes.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Pacientes.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Pacientes.menus.add({
    'roles': ['authenticated'],
    'title': 'Pacientes',
    'link': 'all pacientes'
  });
  Pacientes.menus.add({
    'roles': ['authenticated'],
    'title': 'Crear Paciente',
    'link': 'create paciente'
  });

  //Pacientes.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Pacientes.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Pacientes.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Pacientes.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Pacientes.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Pacientes.aggregateAsset('css', 'pacientes.css');

  return Pacientes;
});
