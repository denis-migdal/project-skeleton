const fs = require('fs');
const CopyPlugin = require('copy-webpack-plugin');
const ZipFilesPlugin = require('webpack-zip-files-plugin');

let pages_config = require('../skeletons/page.js');

module.exports = (type, build, env, argv) => {

	let root_dir = env.PROJECT_DIR;
	let is_production = argv.mode == 'production';

	let uri = type + '/' + build;
	let output_dir = root_dir + '/dist/' + (is_production ? 'prod' : 'dev') + '/' + uri + '/';
	let input_dir = root_dir + '/src/' + uri + '/';


	let config = pages_config(type, build, env, argv);


	config.entry = {};

	for(let file of fs.readdirSync(input_dir + '/entries') ) {

		if( ! file.endsWith('.js') )
			continue;

		let name = file.split('.').slice(0,-1).join('.');
		config.entry[name] = input_dir + '/entries/' + file;
	}

	config.plugins = config.plugins || [];
	config.plugins.push( new CopyPlugin([{ from: '**', to: '.', context: input_dir + '/static' }]) )

	config.plugins.push(
		new ZipFilesPlugin({
			entries: [
				{ src: output_dir, dist: '/'}
			],
			output: output_dir + '/../' + build,
			format: 'zip',
		})
	);

	return config;
};