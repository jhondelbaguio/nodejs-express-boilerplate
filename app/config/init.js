/**
 * Initialize Node Environment
 */
'use strict';

var glob = require('glob'),
    dotenv = require('dotenv'),
    chalk = require('chalk');

dotenv.load();

module.exports = function() {

    var envFiles = glob('./app/config/env/' + process.env.NODE_ENV + '.js', { sync: true });

    if (!envFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.red('NODE_ENV is not defined! Using default development environment'));
        }
    } else {
        console.log(chalk.black.bgWhite('Application loaded using the "' + process.env.NODE_ENV + '" environment configuration'));
    }
}