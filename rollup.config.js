import commonJs from 'rollup-plugin-commonjs';
import postCss from 'rollup-plugin-postcss';
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
		commonJs(),
		postCss({
			extract: true,
			modules: true
		}),
		serve({
			contentBase: [
				'build',
				'source'
			]
		})
	]
};
