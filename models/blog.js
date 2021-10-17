var mongoose = require('mongoose');  
var blogSchema = new mongoose.Schema({  
  author: {
      type: String, 
      required: true
    },
  title: {
      type: String, 
      required: true
    },
  created_at: {
      type: Date, 
      default: Date.now
    },
  content: {
      type: String, 
      required: true
    },
});
mongoose.model('Blog', blogSchema);

module.exports = mongoose.model('Blog');