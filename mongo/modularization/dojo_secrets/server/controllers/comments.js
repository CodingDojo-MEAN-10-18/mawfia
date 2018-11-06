const { Comment } = require('./../models/comment.js');
const Secret = require('./../models/secret.js');

module.exports = {

    new : (request, response) => {

        let comment = new Comment({user_id: request.session.user._id, text: request.body.text});

        Secret.update({_id:request.params.secret_id}, {$push : {comments : comment}}, {runValidators: true}, err => {
            if(err){
                for(let error in err.errors.comments.errors) request.flash('errors', err.errors.comments.errors[`${error}`].message);
                response.redirect('back');
            }
            else {
                //console.log(`Secret successfully updated!`);
                response.redirect(`/secret/${request.params.secret_id}`);
            }
        })

    }

}