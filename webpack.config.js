var webpack = require('webpack');
var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var root = path.resolve(__dirname);
var merge = require('webpack-merge');
var TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = process.env.npm_lifecycle_event;
var common = {
	entry:path.resolve(root,'app'),
	output:{
		path:path.resolve(root,'build'),
		filename:'bundle.js'
	},
	resolve:{
		extensions:['','.js','.jsx']	
	},
	plugins:[
	  new webpack.HotModuleReplacementPlugin(),
	  new HTMLWebpackPlugin({title:'Kanban App'})
	]	
};


//Extending the webpack configuration.

if(TARGET==='start'|| !TARGET) {
	module.exports = merge(common,{
		devtool:'eval-source-map',
		devServer:{
			historyApiFallback:true,
			hot:true,
			inline:true,
			progress:true,
			port:3100,
			colors:true
		},
		module:{
			loaders:[
				{
					test:/\.css$/,
					loaders:['style','css'],
					include:path.resolve(root,'app')
				},
				{
					test:[/\.jsx?$/],
					loaders:['babel'],
					exclude:/node_modules/
				}
			]
		}
	});
}