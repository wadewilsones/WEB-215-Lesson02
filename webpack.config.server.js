const path = require('path');
const CURRENT_WORKING_DER = process.cwd();
const nodeExternals = require('webpack-node-externals');

const config = {
    name:"server",
    entry:[ path.join(CURRENT_WORKING_DER, './server/server.js')], // the entry file where webpack starts bundling
    target: "node",
    output:{
        path:path.join(CURRENT_WORKING_DER, '/dist'),
        filename:'server.generated.js',
        publicPath:'/dist/',
        libraryTarget:"commonjs2" 
    },
    externals:[nodeExternals()],
    module:{
        rules:[{ // regex rule for the file extension to be used for transpilation, and the folfers to be excluded. The tool-transpilation is babel-loader
            test: /\.js$/,
            exclude: /node_modules/,
            use:['babel-loader']
        }]
    }
}

module.exports = config;