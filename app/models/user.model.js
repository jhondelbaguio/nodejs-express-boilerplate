var mongoose = require('mongoose'),
	Schema   = mongoose.Schema;

var userSchema = new Schema({
  name: String,

  createdAt: Date,
  updatedAt: Date
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);
