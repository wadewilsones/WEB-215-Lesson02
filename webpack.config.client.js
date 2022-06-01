const path = require('path');
const webpack = require('webpack')
const CURRENT_WORKING_DER = process.cwd();

const config = {
    name:"browser",
    mode:"development",
    devtool:'eval-source-map',
    entry:[
        'webpack-hot-middleware/client?reload=true',
        path.join(CURRENT_WORKING_DER, 'client/main.js') // the entry file where webpack starts bundling
    ],
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
        },
        {
            test: /\.(ttf|eot|svg|gif|jpg|png)(\?[\s\S]+)?$/,
            use: 'file-loader'
        }]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve:{
        alias:{
            'react-dom': '@hot-loader/react-dom'
        }
    }
}
module.exports = config;