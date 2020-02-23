const fs = require('fs');

module.exports = (type, build, env, argv) => {

	if(build == '@all') {

		let targets = [];

		let elems = fs.readdirSync(__dirname);

		for(let elem of elems)
			if(elem != 'webpack.config.js') {

				let config = require(__dirname + '/' + elem + '/webpack.config.js')(type, elem, env, argv);
				if(Array.isArray(config) )
					targets.push( ...config );
				else
					targets.push(config);
			}

		return targets;
	}

	return require(__dirname + '/' + build + '/webpack.config.js')(type, build, env, argv);

};