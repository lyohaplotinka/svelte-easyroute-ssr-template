import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;
	
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const client = {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js'
	},
	plugins: [
		alias({
			entries: [
				{
					find: 'svelte-easyroute',
					replacement: '/Users/alexeysolovjov/CODE/Github/easyroute-all/svelte-easyroute/lib'
				}
			]
		}),
		svelte({
			dev: !production,
			css: css => {
				css.write('bundle.css');
			},
			hydratable: true
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		!production && serve(),
		!production && livereload('public'),
		production && terser()
	],
	watch: {
		clearScreen: false
	}
};

// Create second output for SSR
const server = {
	input: 'src/App.ssr.svelte',
	output: {
		format: 'commonjs',
		name: 'app',
		file: 'public/ssr/bundle.js',
		exports: 'default'
	},
	plugins: [
		alias({
			entries: [
				{
					find: 'svelte-easyroute',
					replacement: '/Users/alexeysolovjov/CODE/Github/easyroute-all/svelte-easyroute/lib'
				}
			]
		}),
		svelte({
			dev: false,
			css: css => {
				css.write('bundle.css');
			},
			generate: 'ssr'
		}),
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
	]
}

export default [
	client,
	production && server
].filter(Boolean)