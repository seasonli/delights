'use strict';

// Require grunt
var grunt = require('grunt');

// Require libs
require('../lib/task.js')(grunt);

// Load gruntfile
require('../Gruntfile.js')(grunt);

// Do
grunt.task.run('server');
grunt.task.start();
