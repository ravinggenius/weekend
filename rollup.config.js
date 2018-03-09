import resolve from 'rollup-plugin-node-resolve';
import serve from 'rollup-plugin-serve';

export default {
	input: 'source/index.js',
	output: {
		file: 'build/index.js',
		format: 'es',
		sourcemap: true
	},
	watch: {
		clearScreen: false
	},
	plugins: [
		resolve({
			module: true,
			jsnext: true,
			main: true
		}),
		serve({
			contentBase: [
				'build',
				'source'
			]
		})
	]
};
