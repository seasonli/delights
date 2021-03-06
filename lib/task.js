'use strict';

// Nodejs libs
var path = require('path');

module.exports = function (grunt) {
  // Extend grunt
  // Overwrite loadNpmTasks method for load delights dependencies
  grunt.loadNpmTasks = grunt.task.loadNpmTasks = function (name) {
    var root = path.join(__filename, '../..', 'node_modules');
    var pkgfile = path.join(root, name, 'package.json');
    var pkg = grunt.file.exists(pkgfile) ? grunt.file.readJSON(pkgfile) : {keywords: []};

    // Process collection plugins.
    if (pkg.keywords && pkg.keywords.indexOf('gruntcollection') !== -1) {
      loadTaskDepth++;
      Object.keys(pkg.dependencies).forEach(function(depName) {
        // Npm sometimes pulls dependencies out if they're shared, so find upwards if not found locally
        var filepath = grunt.file.findup('node_modules/' + depName, {
          cwd: path.resolve('node_modules', name),
          nocase: true
        });
        if (filepath) {
          // Load this task plugin recursively
          grunt.task.delights.loadNpmTasks(path.relative(root, filepath));
        }
      });
      loadTaskDepth--;
      return;
    }

    // Process task plugins
    var tasksdir = path.join(root, name, 'tasks');
    if (grunt.file.exists(tasksdir)) {
      grunt.loadTasks(tasksdir);
    } else {
      grunt.log.error('Local Npm module "' + name + '" not found. Is it installed?');
    }
  };
}
