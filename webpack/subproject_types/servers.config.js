let node = require('../skeletons/node.js');

module.exports = (type, build, env, argv) => {

	let config = node(type, build, env, argv);

	config.module.rules.push({
		test: /\.node$/,
		use: 'node-loader'
	});
	
	return config;
};