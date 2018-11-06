const mongoose = require('./../config/mongoose.js');

const WolfSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    age: {type: Number, required: true, min: 1, max: 150},
    weight: {type: Number, required: true, min: 1, max: 225}
}, {timestamps: true })

mongoose.model('Wolf', WolfSchema); // We are setting this Schema in our Models as 'Wolf'
module.exports = mongoose.model('Wolf');