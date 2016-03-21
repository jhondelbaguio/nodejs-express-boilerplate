var mongoose = require('mongoose'),
	Users = mongoose.model('User');

exports.index = function(req,res){

	res.render('index', { title: 'Express' });
}