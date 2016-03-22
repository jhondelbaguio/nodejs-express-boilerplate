var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    config = require('./config'),
    helmet = require('helmet'),
    compress = require('compression');

module.exports = function(db) {
    var app = express();

    var rootFolder = path.dirname(require.main.filename);

    config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });


    app.use(compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    // app.engine('html', require('ejs').__express);
    //app.use(favicon(path.join(rootFolder, 'public', 'favicon.ico')));

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.nosniff());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });



    app.use(express.static(path.join(rootFolder, 'public')));

    return app;
}