'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Estudios = new Module('estudios');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Estudios.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Estudios.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Estudios.menus.add({
    'roles': ['authenticated'],
    'title': 'Estudios',
    'link': 'all estudios'
  });
  Estudios.menus.add({
    'roles': ['authenticated'],
    'title': 'Crear Estudio',
    'link': 'create estudio'
  });

  //Estudios.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //Estudios.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Estudios.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Estudios.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Estudios.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  Estudios.aggregateAsset('css', 'estudios.css');

  return Estudios;
});
