const Secret = require('./../models/secret.js');

module.exports = {

    index : (request, response) => {

        return request.session.user ?
            Secret.find({}, (err,secrets) => {
                secrets ?
                response.render('secrets', {user:request.session.user, secrets : secrets}) :
                response.render('secrets', {user:request.session.user, secrets : []});
            }) : response.redirect('/');

    },

    new : (request, response) => {

        let secret = new Secret({user_id: request.session.user._id, text: request.body.text});
        secret.save( err => {
            // if there is an error console.log that something went wrong!
            if(err) for(let error in err.errors) request.flash('errors', err.errors[error].message);
            //else console.log(`Secret successfully added!`);

            return response.redirect('/secrets');
        })

    },

    show : (request, response) => {

        return request.session.user ?
            Secret.findOne({_id:request.params.secret_id}, (err, secret) => {
                secret ?
                    response.render('secret', {user: request.session.user, secret:secret}) :
                    response.redirect('back');
            }) : response.redirect('/');
    },

    destroy : (request, response) => {

        Secret.remove({_id:request.params.secret_id}, err => {
            if(err){
                //console.log(`Error ${err} occured.`);
                for(let key in err.errors) request.flash('errors', err.errors[key].message);
                return response.redirect(`/secret/${request.params.secret_id}`);
            }
            else {
                request.flash("errors", `Secret successfully deleted.`);
                return response.redirect('/secrets');
            }
        })

    }

}