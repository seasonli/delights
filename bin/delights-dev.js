'use strict';

// Require commander
var program = require('commander');

// Require grunt
var grunt = require('grunt');

// Require libs
require('../lib/task.js')(grunt);

// Load gruntfile
require('../Gruntfile.js')(grunt);

// Do
program.option('-w, --watch', 'Watch')
  .parse(process.argv);

if (program.watch) {
  grunt.task.run('dev');
} else {
  grunt.task.run('dev');
}
grunt.task.start();
