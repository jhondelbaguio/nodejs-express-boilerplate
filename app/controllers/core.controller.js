var mongoose = require('mongoose'),
    Users = mongoose.model('User');


module.exports = {
    index: function(req, res) {
        res.render('index', { title: 'Express' });
    },
    checkUser:function(req,res,next){
    	console.log('haha');
    	return next();
    }
}