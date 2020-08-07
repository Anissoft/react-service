import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import camelCase from 'lodash.camelcase';
import typescript from 'rollup-plugin-typescript2';
import json from 'rollup-plugin-json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json');

const libraryName = 'react-service';

export default {
  input: `src/${libraryName}.ts`,
  acorn: {
    allowHashBang: true,
  },
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: ['react', 'react-dom'],
  watch: {
    include: 'src/**',
  },
  plugins: [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps(),
  ],
};
