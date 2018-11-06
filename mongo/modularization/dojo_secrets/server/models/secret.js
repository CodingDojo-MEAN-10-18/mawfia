const mongoose = require('./../config/mongoose.js');
const { CommentSchema } = require('./comment.js');

const SecretSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    text : {type: String, required: [true, 'No secret entered.'], minlength : [2, 'Secret length must be greater than 2 charaters'], maxlength : [200, 'Secret length must be shorter than 200 characters.']},
    comments : {type: [CommentSchema], required: false}
}, {timestamps: true })

mongoose.model('Secret', SecretSchema);
const Secret = mongoose.model('Secret');

module.exports = Secret;