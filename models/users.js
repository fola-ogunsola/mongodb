var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  first_name: String,
  last_name: String,
  email: String,
  password: String
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');