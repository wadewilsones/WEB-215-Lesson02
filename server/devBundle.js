import config from './../config/config'
import { webpack } from 'webpack'
import WebpackMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './../webpack.config.client.js'

const compile = (app) => {
    if(config.env === "development"){
        const compiler = webpack(webpackConfig)
        const middleware = WebpackMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath
        })
    app.use(middleware)
    }
}

export default {compile};