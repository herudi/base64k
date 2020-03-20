import multi from '@rollup/plugin-multi-entry';
export default {
    input: 'lib/**/*.js',
    output: {
        file: './dist/base64k.js',
        format: 'iife',
        name:'base64k'
    },
    plugins: [multi()]
};