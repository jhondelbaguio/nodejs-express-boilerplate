var init = require('./app/config/init')(),
    mongoose = require('mongoose'),
    config = require('./app/config/config'),
    chalk = require('chalk');

var db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }

    console.log(chalk.blue('Successfully connected to MongoDB'));
});

var app = require('./app/config/express')(db),
    port = process.env.PORT || '3000';

app.listen(port);

exports = module.exports = app;

console.log('Express-boilerplate started on port ' + port);