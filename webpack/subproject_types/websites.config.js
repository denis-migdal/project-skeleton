const fs = require('fs');

let pages_config = require('../skeletons/page.js');

module.exports = (type, build, env, argv) => {

	let configs = [];

	let wconfig = pages_config(type, build, env, argv);

	let root_dir = env.PROJECT_DIR;
	let is_production = argv.mode == 'production';

	let uri = type + '/' + build;
	let output_dir = root_dir + '/dist/' + (is_production ? 'prod' : 'dev') + '/' + uri + '/';
	let input_dir = root_dir + '/src/' + uri + '/';

	let pages_dir = env.PROJECT_DIR + 'src/pages/';
	let pages = fs.readdirSync(pages_dir);

	for(let page of pages)
		if(page != 'webpack.config.js')
			if( require(pages_dir + page + '/meta.json').use_in.includes(uri) ) {

				let config = require( root_dir + 'src/pages/webpack.config.js')('pages', page, env, argv);
				config.output.path = wconfig.output.path + '/' + page + '/';
				configs.push( config );
			}

	configs.push( wconfig );

	return configs;
};