/**
 * @fileoverview Grunt task configure
 * @author SeasonLi | season.chopsticks@gmail.com
 * @description Delights - Grunt task configure
 * @version 1.0 | 2015-01-18 | SeasonLi    // Initial version
 *                                         // Add copy task
 * @version 1.1 | 2015-02-03 | SeasonLi    // Adjust config ways
 * @version 1.2 | 2015-02-04 | SeasonLi    // Use imagemin
 * @version 2.0 | 2015-11-22 | SeasonLi    // Strongify build tools
 * @version 3.0 | 2016-03-19 | SeasonLi    // Use webpack
 * @version 3.1 | 2016-04-21 | SeasonLi    // Import local server
 */

var webpack = require('webpack');


module.exports = function (grunt) {
  // Grunt tasks config
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dev: ['./dev/'],
      release: ['./release/']
    },
    htmlbuild: {
      dev: {
        options: {
          data: {
            version: grunt.file.readJSON('package.json').version
          }
        },
        files: [{
          expand: true,
          cwd: '',
          src: ['page/**/*.html'],
          dest: 'dev/'
        }]
      },
      release: {
        options: {
          data: {
            version: grunt.file.readJSON('package.json').version
          }
        },
        files: [{
          expand: true,
          cwd: '',
          src: ['page/**/*.html'],
          dest: 'release/'
        }]
      }
    },
    webpack: {
      common: {
        entry: {
          'app': './static/js/app.js',
        },
        output: {
          filename: '[name].js',
          path: 'dev/static/js/'
        },
        module: {
          // loaders: [{
          //   loader: 'jsx-loader'
          // }]
        },
        plugins: []
      }
    },
    copy: {
      common: {
        files: [{
          expand: true,
          cwd: '',
          src: ['static/**/*.{css,js,gif,png,jpg,jpeg,gif}'],
          dest: 'dev/'
        }]
      }
    },
    less: {
      common: {
        files: [{
          expand: true,
          cwd: '',
          src: ['static/css/**/*.less'],
          dest: 'dev/',
          ext: '.css'
        }]
      }
    },
    imagemin: {
      common: {
        options: {
          optimizationLevel: 3,
        },
        files: [{
          expand: true,
          cwd: '',
          src: ['static/**/*.{png,jpg,jpeg,gif}'],
          dest: 'dev/'
        }]
      }
    },
    watch: {
      common: {
        files: [
          'page/**/*.*',
          'static/**/*.*'
        ],
        tasks: [
          'htmlbuild:dev',
          'webpack:common',
          'copy:common'
        ]
      }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 6
      },
      common: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['static/**/*.{js,css}'],
          dest: 'dev/'
        }]
      }
    },
    usemin: {
      options: {
        assetsDirs: [],
        patterns: {
          common: [
            [/([a-zA-Z\.\d]+\.js|[a-zA-Z\.\d]+\.css)/g]
          ]
        }
      },
      common: {
        files: [{
          expand: true,
          cwd: '',
          src: ['page/**/*.html'],
          dest: ''
        }]
      }
    },
    connect: {
      options: {
        keepalive: true
      },
      common: {}
    }
  });


  // Load npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Entrance
  // Release
  grunt.task.registerTask('release', function () {
    var dest = 'release/' + grunt.config.get('pkg.name') + '/' + grunt.config
      .get('pkg.version') + '/';

    grunt.config.set('htmlbuild.release.files.0.dest', dest);
    grunt.config.set('webpack.common.output.path', dest + 'static/js/');
    grunt.config.set('webpack.common.plugins.0',
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    );
    grunt.config.set('copy.common.files.0.dest', dest);
    grunt.config.set('less.common.files.0.dest', dest);
    grunt.config.set('imagemin.common.files.0.dest', dest);
    grunt.config.set('filerev.common.files.0.cwd', dest);
    grunt.config.set('filerev.common.files.0.dest', dest);
    grunt.config.set('usemin.options.assetsDirs', [dest + 'static/css/',
      dest + 'static/js/'
    ]);
    grunt.config.set('usemin.common.files.0.cwd', dest);
    grunt.config.set('usemin.common.files.0.dest', dest);

    grunt.task.run('clean:release');
    grunt.task.run('htmlbuild:release');
    grunt.task.run('webpack:common');
    // grunt.task.run('copy:common');
    // grunt.task.run('less:common');
    // grunt.task.run('imagemin:common');
    // grunt.task.run('filerev:common');
    // grunt.task.run('usemin:common');
  });

  // Dev
  grunt.task.registerTask('dev', function () {
    var dest = 'dev/',
      watch = grunt.option('watch');

    grunt.config.set('htmlbuild.dev.files.0.dest', dest);
    grunt.config.set('webpack.common.output.path', dest + 'static/js/');
    grunt.config.set('copy.common.files.0.dest', dest);
    grunt.config.set('less.common.files.0.dest', dest);

    grunt.task.run('clean:dev');
    grunt.task.run('htmlbuild:dev');
    grunt.task.run('webpack:common');
    grunt.task.run('copy:common');
    // grunt.task.run('less:common');

    // if (watch) {
    grunt.task.run('watch:common');
    // }
  });

  // Server
  grunt.task.registerTask('server', function () {
    grunt.task.run('connect:common');
  });
};
