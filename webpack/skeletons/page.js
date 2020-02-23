let base = require('./base.js');

module.exports = (type, build, env, argv) => {

	let config = base(type, build, env, argv);


	let root_dir = env.PROJECT_DIR;
	let is_production = argv.mode == 'production';

	let uri = type + '/' + build;
	let output_dir = root_dir + '/dist/' + (is_production ? 'prod' : 'dev') + '/' + uri + '/';
	let input_dir = root_dir + '/src/' + uri + '/';


	config.node.fs = 'empty';

	let rules = [

		{ // DO NOT CHANGE POSITION OF THIS RULE !
			test: /\.html$/,
			enforce: 'post',
			issuer: {test: /\.js$/},
			use: [
				{
					loader: 'file-loader',
					options: {
						name: "[path]/[name].[ext]",
						context: input_dir
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
			test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
			loader: 'url-loader'
		}
	];

	if( is_production )
		config.module.rules[0].use.splice(1, 0, 'html-minifier-loader');

	config.module.rules.push(... rules);

	return config;
}