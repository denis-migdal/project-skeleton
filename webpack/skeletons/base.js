module.exports = (type, build, env, argv) => {

	let root_dir = env.PROJECT_DIR;
	let is_production = argv.mode == 'production';

	let uri = type + '/' + build;
	let output_dir = root_dir + '/dist/' + (is_production ? 'prod' : 'dev') + '/' + uri + '/';
	let input_dir = root_dir + '/src/' + uri + '/';

	return {
		entry: {
			main: input_dir + '/main.js'
		},
		output:{
			filename: '[name].bundle.js',
			path: output_dir
		},
		module: {
			rules: [
				{
					test: /\.json5$/,
					loader: 'json5-loader',
				}
			]
		},
	  	resolve: {
			modules: [root_dir + '/libs', root_dir + '/node_modules', 'node_modules'],
			mainFiles: ['main', 'index'],
			extensions: ['.js', '.json5', '.json', '.html']
		},
		resolveLoader: {
			modules: [root_dir + '/libs', root_dir + '/node_modules', 'node_modules']
		},
		devtool: 'source-map',
		node: {
			__filename: true,
			__dirname: true,
		}
	};
};


/* {
					test: /\.worker\.js$/,
					use: 'worker-loader?inline=true&fallback=false&name='+module_name+'/[name].[ext]'
				}{
					test: /content\.bin$/,
					loader: 'file-loader',
					options: {
						limit: 8192,
						name: (path) => { return path.split('/').slice(-2).join('/'); },
						outputPath: module_name + '/kdb/', //the icons will be stored in dist/assets folder
						publicPath:'kdb/'
					}	
				}*/