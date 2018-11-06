const mongoose = require('./../config/mongoose.js');

const CommentSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    text : {type: String, required: [true, 'No comment entered.'], minlength : [2, 'Comment length must be greater than 2 charaters'], maxlength : [200, 'Comment length must be shorter than 200 characters.']},
}, {timestamps: true })

mongoose.model('Comment', CommentSchema);
const Comment = mongoose.model('Comment');
module.exports = { Comment, CommentSchema };