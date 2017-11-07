module.exports = function(config) {

  config.set({
    basePath: './',
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      
      'src/**/*.ts'
    ],
    exclude: [],
    reporters: ['progress', 'coverage'],
    preprocessors: {
      'src/**/*.ts': ["karma-typescript"]
    },
    karmaTypescriptConfig: {
      compilerOptions: {
				 target: 'ES6'
       },
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
    browsers: ['ChromeHeadless'],
    captureTimeout: 60000
  });
};
