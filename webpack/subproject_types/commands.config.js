let node = require('../skeletons/node.js');

module.exports = (type, build, env, argv) => {
	return node(type, build, env, argv);
};