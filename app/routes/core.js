module.exports = function(app) {
    var core = require('../../app/controllers/core.controller.js');
    app.get('/', core.checkUser, core.index);

};