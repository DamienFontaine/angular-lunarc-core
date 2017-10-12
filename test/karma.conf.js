module.exports = function(config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-resource/angular-resource.js',
      'node_modules/angular-jwt/dist/angular-jwt.js',
      'src/**/*.js',
      'test/unit/**/*.js'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.js': ['webpack']
    },
    coverageReporter: {
      dir: 'coverage/',
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'lcov'
      }]
    },
    webpack: {
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'istanbul-instrumenter-loader'
        }]
      }
    },
    webpackMiddleware: {
      noInfo: true,
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
