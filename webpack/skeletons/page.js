let base = require('./base.js');

module.exports = (type, build, env, argv) => {

	let config = base(type, build, env, argv);

	config.node.fs = 'empty';

	let is_production = argv.mode == 'production';

	let rules = [

		{ // DO NOT CHANGE POSITION OF THIS RULE !
			test: /\.html$/,
			enforce: 'post',
			issuer: {test: /\.js$/},
			use: [
				{
					loader: 'file-loader',
					options: {
						name: "[name].[ext]"
					}
				},
				'extract-loader',
				{
					loader: 'html-loader',
					options: {
						interpolate: true,
						minimize: false
					}
				}
			]
		},{
			test: /\.html$/,
			enforce: 'post',
			issuer: {exclude: /\.js$/},
			use: [{
				loader: 'html-loader',
				options: {
					interpolate: true,
					minimize: false
				}
			}]
		}, {
			test: /\.(html|js)$/,
			use: 'prehtml-loader'
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'url-loader'
		}
	];

	if( is_production )
		config.module.rules[0].use.splice(1, 0, 'html-minifier-loader');

	config.module.rules.push(... rules);

	return config;
}