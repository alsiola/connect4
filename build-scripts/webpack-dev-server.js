const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const clearConsole = require('react-dev-utils/clearConsole');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');
const path = require('path');
const config = require('./webpack.config.dev');

process.env.NODE_ENV = 'development';
process.env.silent = true;

const log = (msg, colour = 'green') => {
    console.log(chalk[colour](msg));
    console.log();
}

const compiler = webpack(config);

compiler.plugin('invalid', () => {
    clearConsole();
    log("Change detected, recompiling...", "yellow");
});

compiler.plugin('done', stats => {
    clearConsole();
    const messages = formatWebpackMessages(stats.toJson({}, true));

    if (messages.errors.length > 0 ) {
        log("Compilation errors: ", 'red');
        messages.errors.forEach(msg => {
            log(msg, 'red');            
        });
        return;
    }

    if (messages.warnings.length > 0 ) {
        log("Compilation warnings: ", 'yellow');
        messages.warnings.forEach(msg => {
            log(msg, 'yellow');
        });
        return;
    }

    log("Re-compiled successfully.", 'green');
    log("Listening on localhost:8080");
});


const server = new webpackDevServer(compiler, {
    publicPath: '/',
    contentBase: './',
    clientLogLevel: 'info',
    hot: true,
    historyApiFallback: true,
    quiet: true,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            secure: false
        }
    }
})



server.listen(8080, 'localhost', (err, result) => {
    if (err) {
        console.log(err);
    }

    console.log("Dev server listening on localhost:3000");
})