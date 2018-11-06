const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dojo_secrets');

module.exports = mongoose;