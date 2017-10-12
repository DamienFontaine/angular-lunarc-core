module.exports = function(grunt) {

  const webpackConfig = require('./webpack.config');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        keepalive: true
      },
      server: {}
    },
    jshint: {
      all: ['gruntfile.js', 'src/**/*.js'],
      options: {
        esnext: true,
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      core: {
        src: ['src/**/*.js'],
        dest: 'lib/angular-lunarc-core.js'
      }
    },
    webpack: {
      prod: webpackConfig,
    },
    uglify: {
      options: {
        mangle: false
      },
      lunarc: {
        files: {
          'lib/angular-lunarc-core.min.js': ['lib/angular-lunarc-core.js']
        }
      }
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'webpack']
      }
    },
    ngdocs: {
      options: {
        dest: 'docs',
        title: "angular-lunarc-core",
        html5Mode: false,
        scripts: [
          'node_modules/angular/angular.js',
          'node_modules/angular-animate/angular-animate.js'
        ]
      },
      api: {
        src: ['src/**/*.js'],
        title: 'Core'
      }
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    }
  });
  // Load NPM tasks
  require('load-grunt-tasks')(grunt);
  // Tasks
  grunt.registerTask('default', ['jshint', 'webpack', 'uglify']);
  grunt.registerTask('test', ['jshint','webpack', 'uglify', 'karma']);
  grunt.registerTask('docs', ['ngdocs', 'connect']);
  grunt.registerTask('build', ['webpack', 'uglify', 'ngdocs']);
};
