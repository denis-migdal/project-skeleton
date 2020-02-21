module.exports = (env, argv) => {

	throw 'Not implemented yet !'
};


/* config_builders['apps'] = function(uri) {

	let root_dir = __dirname;
	let output_dir = __dirname + '/dist/' + uri;
	let input_dir = __dirname + '/src/' + uri;

	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},{
					test: /\.json5$/,
					use: 'json5-loader',
					type: 'javascript/auto'
				},
			]
		},
		entry: {
			content_script: input_dir + '/js/content_script/main.js',
			background: input_dir + '/js/background/main.js',
			menu: input_dir + '/js/menu/main.js'
		},
		plugins: [
			new CopyPlugin([
				{ from: '**', to: uri, context: input_dir + '/dist' },
				{ from: '**', to: uri + '/demo', context: root_dir +'/dist/' + uri.replace('apps', 'modules') },
			])
		],
		output:{
			filename: uri + '/[name].bundle.js',
			path: root_dir + '/dist/'
		},
		devtool: 'source-map'
	};
}*/