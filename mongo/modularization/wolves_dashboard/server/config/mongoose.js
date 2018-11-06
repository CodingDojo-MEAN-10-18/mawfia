const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wolves_dashboard');

module.exports = mongoose;