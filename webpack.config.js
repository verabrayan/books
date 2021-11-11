const path = require ('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production';


module.exports ={
    entry:'./Frontend/app.js',
    output: {
        path: path.join(__dirname,'Backend/public'),
        filename: 'js/bundle.js'
    },
    
    mode: "production",

    module:{
        rules: [{
            test: /\.css/,
            use: [
                devMode ? 'style-loader': miniCssExtractPlugin.loader,
                'css-loader'
            ]
        }
        ]
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './Frontend/index.html',
            minify: {
                collapseWhitespace: true,//quitar espacios en blanco html
                removeComments: true,// quitar comentarios
                removeRedundantAttributes: true,//quitar el codigo redundante de los atributos de html
                removeScriptTypeAttributes: true,//el tipo de los atributos
                removeStyleLinkAttrinutes: true,//el tipo del link
                useShortDoctype: true
            }
        }),

        new miniCssExtractPlugin({
            filename: 'css/bundle.css'
        })
    ],
    devtool: 'source-map'
}