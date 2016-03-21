var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config');
var router = express.Router();



module.exports = function(db) {
    var app = express();

    var rootFolder = path.dirname(require.main.filename);

     config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });



    app.use(express.static(path.join(rootFolder, 'public')));
    return app;
}