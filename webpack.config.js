// Needed hackery to get __filename and __dirname in ES6 mode
// see: https://stackoverflow.com/questions/46745014/alternative-for-dirname-in-node-js-when-using-es6-modules
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import plgInCopy from 'copy-webpack-plugin';

const CopyPlugin = plgInCopy;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export default [
    // output an ES6 module
    {
        entry: './src/main.mjs',
        experiments: {
            outputModule: true,
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'grumptech-spawn-helper.js',
            library: {
                type: 'module',
            },
        },
        externals: [
            'url', 'fs', 'path', 'child_process', 'buffer',
        ],
        module: {
            parser: {
                javascript: {importMeta: false},
            },
        },
        plugins: [
            // Copy the typescript-friendly exports. Keeps esLint happy.
            new CopyPlugin({
                patterns: [
                    {
                        from: './src/main.d.ts',
                        to: path.resolve(__dirname, 'dist', 'grumptech-spawn-helper.d.ts'),
                    },
                ],
            }),
        ],
    },
];
