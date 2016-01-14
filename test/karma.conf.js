module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-jwt/dist/angular-jwt.js',
      'bower_components/angular-resource/angular-resource.js',
      'lib/angular-lunarc-core.js',
      'test/unit/**/*.js'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'lib/angular-lunarc-core.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
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
