module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      options: {
        keepalive: true
      },
      server: {}
    },
    jshint: {
      all: ['gruntfile.js', 'src/**/*.js']
    },
    browserify: {
      options: {
        extension: ['.js'],
        external: [
          "angular-jwt",
          "angular-resource"
        ]
      },
      core: {
        src: 'src/angular-lunarc-core.js',
        dest: 'lib/angular-lunarc-core.js'
      }
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
        tasks: ['jshint', 'browserify']
      }
    },
    ngdocs: {
      options: {
        dest: 'docs',
        title: "angular-lunarc-core",
        html5Mode: false,
        scripts: [
          'bower_components/angular/angular.js',
          'bower_components/angular-animate/angular-animate.js'
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
    },
  });
  // Load NPM tasks
  require('load-grunt-tasks')(grunt);
  // Tasks
  grunt.registerTask('default', ['jshint', 'browserify', 'uglify']);
  grunt.registerTask('test', ['jshint', 'browserify', 'uglify', 'karma']);
  grunt.registerTask('docs', ['ngdocs', 'connect']);
  grunt.registerTask('build', ['browserify', 'uglify', 'ngdocs']);
};
