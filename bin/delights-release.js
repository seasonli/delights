'use strict';

// Require pkg
var pkg = require('../package.json');

// Require grunt
var grunt = require('grunt');

// Require libs
require('../lib/task.js')(grunt);

// Load gruntfile
require('../Gruntfile.js')(grunt);

// Do
grunt.task.run('release');
grunt.task.start();
