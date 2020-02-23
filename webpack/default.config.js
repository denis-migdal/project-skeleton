const fs = require('fs');

const SKLT_WEBPACK_DIR = __dirname + '/';
const PROJECT_DIR = __dirname + '/../../../';

module.exports = (env, argv) => {

	if( env === undefined || ! ('src' in env) )
		return [];

	env.SKLT_WEBPACK_DIR = env.SKLT_WEBPACK_DIR || SKLT_WEBPACK_DIR;


	env.PROJECT_DIR = env.PROJECT_DIR || PROJECT_DIR;
	let PROJECT_SRC_DIR = env.PROJECT_DIR + 'src/';

	let configs = [];
	const build_list = env.src.split(',');


	let SUBPROJECT_TYPES = {};

	const subproject_types_dirs = fs.readdirSync(PROJECT_SRC_DIR);
	for(let subproject_type of subproject_types_dirs)
		SUBPROJECT_TYPES[subproject_type] = require(PROJECT_SRC_DIR + subproject_type + '/webpack.config.js');

	for(let build of build_list) {

		let build_parts = build.split('/');
		if(build_parts[0] == '.' )
			build_parts.shift();
		if(build_parts[0] == 'src')
			build_parts.shift();

		if( build_parts[0] == '@all' ) {

			for(let type in SUBPROJECT_TYPES) {

				let target = SUBPROJECT_TYPES[type](type, build_parts[1], env, argv);

				if( Array.isArray(target) )
					configs.push( ... target );
				else
					configs.push( target );
			}
		}
		else {

			let target = SUBPROJECT_TYPES[build_parts[0]](...build_parts, env, argv);

			if( Array.isArray(target) )
				configs.push( ... target );
			else
				configs.push( target );
		}
	};

	return configs;
};