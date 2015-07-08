var path = require('path');

var webpack = {

	cache: true,
	
	entry: [
		path.resolve('./client/javascripts/main.js'),
	],
	
	output: {
		path: path.resolve('./public/javascripts'),
		filename: 'bundle.js'
	},
	
	devtool: 'cheap-source-map',
	
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
			{test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader'},
			{test: /\.json$/, loader: 'json-loader'},
		]
	},
	
	resolve: {
		extensions: ['', '.js', '.jsx']
	}

};

module.exports = webpack;
