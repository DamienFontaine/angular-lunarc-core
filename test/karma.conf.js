var istanbul = require('browserify-istanbul');

module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['browserify', 'jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'src/**/*.js',
      'test/unit/**/*.js'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['browserify']
    },
    browserify: {
      transform: [
        [
          'browserify-istanbul', {
            instrumenterConfig: {
              embedSource: true
            }
          }
        ]
      ]
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'lcov'
      }]
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    captureTimeout: 60000,
    singleRun: true
  });
};
