var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogapi');
mongoose.Promise = global.Promise;