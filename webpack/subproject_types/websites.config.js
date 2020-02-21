let pages = require('../skeletons/page.js');

module.exports = (type, build, env, argv) => {
	return pages(type, build, env, argv);
};