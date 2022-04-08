const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js'
    },
    devServer: {
        allowedHosts: 'all',
      //  watchContentBase:true,
      historyApiFallback: true,
    },
    module: {
        rules:[
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader : 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                exclude: /node_modules/,
                use: [
                {
                    loader:'file-loader',
                  //loader: 'url-loader',
                  options: {
                    limit: 10000,
                    name: '[name].[ext]',
                    outputPath: 'assets/images/', 
                    publicPath: '../'
                  }
                }
              ] 
            },
            // {
            //     test: /.(ttf|otf|eot|svg|woff(2)?)$/,
            //     use: [{
            //         loader: 'file-loader',
            //         options: {
            //             name: '[name].[ext]',
            //             outputPath: 'fonts/',    // where the fonts will go
            //             publicPath: '../'       // override the default path
            //         }
            //     }]
            // },
        ]
    },
    optimization: {
        minimize: true,
    },
    resolve: {
        fallback: {
            "fs": false,
            "path": require.resolve("path-browserify"),
            "os": false,
            "stream": require.resolve("stream-browserify")
        },
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                NODE_ENV: JSON.stringify("development"),
            },
        }),
    ]
}