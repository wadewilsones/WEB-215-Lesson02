const path = require('path');
const webpack = require('webpack')
const CURRENT_WORKING_DER = process.cwd();

const config = {
    
    mode:"production",
    entry:[path.join(CURRENT_WORKING_DER, 'client/main.js')], // the entry file where webpack starts bundling
    output:{
        path:path.join(CURRENT_WORKING_DER, '/dist'),
        filename:'bundle.js',
        publicPath:'/dist/' // the base path for all assets in the app
    },
    module:{
        rules:[{ // regex rule for the file extension to be used for transpilation, and the folfers to be excluded. The tool-transpilation is babel-loader
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use:['babel-loader']
        }]
    }
}
module.exports = config;