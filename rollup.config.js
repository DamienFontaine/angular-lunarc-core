import uglify from 'rollup-plugin-uglify';

export default {
  input: 'dist/index.js',
  output :{
    file: 'dist/bundles/angular-lunarc-core.umd.js',
    format: 'umd',
    exports: 'named',
    amd: {id: '@lunarc/core'},
  },
  plugins: [
    uglify()
  ],
  sourcemap: false,
  name: 'angular-lunarc-core',
  globals: {
    '@angular/core': 'core',
    'angular2-jwt/angular2-jwt': 'angular2Jwt',
    '@angular/common/http': 'http'
  },
  external: [
    '@angular/core',
    '@angular/common/http',
    'angular2-jwt/angular2-jwt',
  ],
}
