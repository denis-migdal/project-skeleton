module.exports = (type, build, env, argv) => {

	
	return require(env.SKLT_WEBPACK_DIR + 'subproject_types/' + type + '.config.js')(type, build, env, argv);
};