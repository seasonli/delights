/**
 * @Fileoverview Grunt task configure
 * @Author SeasonLi | season.chopsticks@gmail.com
 * @Description Delights - Grunt task configure
 * @Version 1.0 | 2015-01-18 | SeasonLi    // Initial version
 *                                         // Add copy task
 * @Version 1.1 | 2015-02-03 | SeasonLi    // Adjust config ways
 * @Version 1.2 | 2015-02-04 | SeasonLi    // Use imagemin
 * @Version 2.0 | 2015-11-22 | SeasonLi    // Strongify build tools
 **/

module.exports = function (grunt) {
  // Grunt tasks config
  grunt.config.init({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dev: ['./_dev/'],
      release: ['./_release/']
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
          dest: '_dev/'
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
          dest: '_release/'
        }]
      }
    },
    copy: {
      common: {
        files: [{
          expand: true,
          cwd: '',
          src: ['static/**/*.{js,gif,png,jpg,jpeg,gif}'],
          dest: '_dev/'
        }]
      }
    },
    less: {
      common: {
        files: [{
          expand: true,
          cwd: '',
          src: ['static/css/**/*.less'],
          dest: '_dev/',
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
          dest: '_dev/'
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
          'getTime',
          'htmlbuild:dev',
          'copy:common',
          'less:common'
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
          cwd: '_dev/',
          src: ['static/**/*.{js,css}'],
          dest: '_dev/'
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
    }
  });


  // Load npm tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-html-build');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-usemin');

  // Entrance
  // Release
  grunt.task.registerTask('release', function () {
    var dest = '_release/' + grunt.config.get('pkg.name') + '/' + grunt.config.get('pkg.version') + '/';

    grunt.config.set('clean.release.0', dest);
    grunt.config.set('htmlbuild.release.files.0.dest', dest);
    grunt.config.set('copy.common.files.0.dest', dest);
    grunt.config.set('less.common.files.0.dest', dest);
    grunt.config.set('imagemin.common.files.0.dest', dest);
    grunt.config.set('filerev.common.files.0.cwd', dest);
    grunt.config.set('filerev.common.files.0.dest', dest);
    grunt.config.set('usemin.options.assetsDirs', [dest + 'static/css/', dest + 'static/js/']);
    grunt.config.set('usemin.common.files.0.cwd', dest);
    grunt.config.set('usemin.common.files.0.dest', dest);

    // grunt.task.run('clean:release');
    grunt.task.run('htmlbuild:release');
    grunt.task.run('less:common');
    grunt.task.run('imagemin:common');
    grunt.task.run('filerev:common');
    grunt.task.run('usemin:common');
  });

  // Dev
  grunt.task.registerTask('dev', function () {
    var dest = '_dev/',
      watch = grunt.option('watch');

    grunt.config.set('clean.dev.0', dest);
    grunt.config.set('htmlbuild.dev.files.0.dest', dest);
    grunt.config.set('copy.common.files.0.dest', dest);
    grunt.config.set('less.common.files.0.dest', dest);

    if (watch) {
      grunt.task.run('watch:common');
    } else {
      grunt.task.run('htmlbuild:dev');
      grunt.task.run('copy:common');
      grunt.task.run('less:common');
    }
  });
};