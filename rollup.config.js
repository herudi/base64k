import multi from '@rollup/plugin-multi-entry';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input: 'lib/**/*.js',
    output: {
        file: './dist/base64k.js',
        format: 'iife',
        name:'base64k'
    },
    plugins: [commonjs(), multi()]
};