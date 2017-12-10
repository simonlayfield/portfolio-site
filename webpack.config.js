module.exports = {
    entry: './app/js/main.js',
    output: {
        filename: './public/assets/js/app-bundle.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                // If you're following the tutorial for the first time,
                // you will be using Babel v6 and thus you need to add this extra configuration
                query: {
                    presets: ['babel-preset-es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'ractive'
            }
        ]
    }
};
