var init = require('./app/config/init')();
var mongoose = require('mongoose');
var config = require('./app/config/config');
var chalk = require('chalk');

var db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }

    console.log(chalk.blue('Successfully connected to MongoDB'));
});

var app = require('./app/config/express')(db);
app.listen(1337);
exports = module.exports = app;
console.log('Express-boilerplate started on port ' + 1337);