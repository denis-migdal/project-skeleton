let base = require('./base.js');

module.exports = (type, build, env, argv) => {

	let config = base(type, build, env, argv);

	config.target = 'node';

	return config;
}