const moment = require('moment');
const crypto = require('crypto');
const User = require('./../models/user.js');

const createKey = ()=> {
    let key = '';
    // Creates a random 10-characters (hex values, 0-f) long string
    for(let x = 0; x < 10; x++) key += Math.random() > .5 ? Math.floor(Math.random()*10).toString() : String.fromCharCode(122 - Math.floor(Math.random()*26));
    return key;
}

module.exports = {

    index : (request, response) => {
        return request.session.user ? response.redirect('/profile') : response.render('index', {user: {}, form: 0, moment: moment});
    },

    register : (request, response) => {

        let user = new User();
        for(let field in request.body) user[field] = request.body[field];

        user.save( err => {
            if(err) {
                for(let error in err.errors) request.flash('errors', err.errors[error].message);
                return response.render('index', {user: request.body, form: 1, moment: moment});
            }
            else {
                user.key = createKey();
                let hpassword = crypto.createHmac('sha256', user.key).update(request.body.password).digest('hex');

                User.updateOne({_id:user._id},{$set:{password:hpassword, cpassword:hpassword, key:user.key}}, err => {
                    user.password = user.cpassword = user.key = null;
                    request.session.user = user;
                    return response.redirect('/profile');
                });
            }
        })
    },

    login : (request, response) => {

        User.findOne({email:request.body.email},(err, user) => {

            if(err) for(let error in err.errors) request.flash('errors', err.errors[error].message);

            if(user){
                if(user.password == crypto.createHmac('sha256', user.key).update(request.body.password).digest('hex')){
                    user.password = user.cpassword = user.key = null;
                    request.session.user = user;
                    return response.redirect('/profile');
                }
                else{
                    request.flash('errors', 'Invalid password entered.'); // Not sure what condition will trigger this error
                    return response.redirect('/');
                }
            }
            else {
                request.flash('errors', `User not found for email: '${request.body.email}'`);
                return response.redirect('/');
            }
        })

    },

    profile : (request, response) => {

        return request.session.user ? response.render('profile', {user:request.session.user, moment: moment}) : response.redirect('/');

    },

    logout : (request, response) => {

        request.session.user = null;
        return response.redirect('/');
    }

}