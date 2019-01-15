const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/login_registration');

module.exports = mongoose;