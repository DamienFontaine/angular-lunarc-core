import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

export default {
  input: 'dist/index.js',
  output :{
    file: 'dist/bundles/angular-lunarc-core.umd.js',
    format: 'umd',
    exports: 'named',
    amd: {id: '@lunarc/core'}
  },
  plugins: [
    resolve(),
    uglify()
  ],
  sourcemap: false,
  name: 'angular-lunarc-core',
  globals: {
    '@angular/core': 'core',
    '@angular/common/http': 'http',
    'rxjs/Observable': 'Observable',
  },
  external: [
    '@angular/core',
    '@angular/common/http',
    'rxjs/Observable',
  ]
}
