const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const moment = require('moment');
const crypto = require('crypto');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(session({secret: 'victoriassecrect', resave: false, saveUninitialized: true, cookie: { maxAge: 600000} }));
app.use(flash());

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, 'Missing first name.'], minlength: [2, `First Name is too short. (2-25 characters)`], maxlength : [25, 'First Name is too long. (2-25 characters)']},
    last_name : {type: String, required: [true, 'Missing last name.'], minlength : [2, `Last Name is too short. (2-25 characters)`], maxlength : [25, 'Last Name is too long. (2-25 characters)']},
    email: {
        type: String,
        validate: {
          isAsync: true,
          validator: (e, validate) => {
              User.find({email:e},(err,email) => {
                  validate(email.length === 0 && /^\w+@\w+[.]{1}[\w.]+$/.test(e), email.length !== 0 ? "Email already exists." : `${e} is not a valid email!`);
              });
          },
          // Default error message, overridden by 2nd argument to `cb()` above
          message: 'Default error message'
        },
        required: [true, 'Email field is blank.'], maxlength : [25, 'Email must be 25 characters or less in length.']
      },
    birthday : {
        type: Date,
        validate: { validator: d => {
            let current = new Date();
            return d < new Date(current.getFullYear()-18, current.getMonth(), current.getDate());
        }, message: `You must be 18 years or older to register.` },
        required: [true, 'Birthdate is missing.']
      },
    password : {
        type: String,
        validate: { validator: p => { return /^(?=.*[0-9])(?=.*[A-Z])([a-zA-Z0-9!@#$%^&*()]{8,16})$/.test(p); }, message: `Password must be 8-16 characters and contain atleast one number and uppercase letter.` },
        required: [true, 'Password field is blank.']
      },
    cpassword : {
        type: String,
        validate: { validator: function() { return this.password === this.cpassword }, message: `Passwords do not match.` },
        required: [true, 'Second password field is blank.']
    },
    key : {
        type: String
    }
}, {timestamps: true })

const CommentSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    text : {type: String, required: [true, 'No comment entered.'], minlength : [2, 'Comment length must be greater than 2 charaters'], maxlength : [200, 'Comment length must be shorter than 200 characters.']},
}, {timestamps: true })

const SecretSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    text : {type: String, required: [true, 'No secret entered.'], minlength : [2, 'Secret length must be greater than 2 charaters'], maxlength : [200, 'Secret length must be shorter than 200 characters.']},
    comments : {type: [CommentSchema], required: false}
}, {timestamps: true })

mongoose.connect('mongodb://localhost/dojo_secrets');
mongoose.model('User', UserSchema);
mongoose.model('Secret', SecretSchema);
mongoose.model('Comment', CommentSchema);
const User = mongoose.model('User');
const Secret = mongoose.model('Secret');
const Comment = mongoose.model('Comment');

app.get('/', (request, response) => {

    return request.session.user ? response.redirect('/profile') : response.render('index', {user: {}, form: 0, moment: moment});
})

const createKey = ()=> {
    let key = '';
    // Creates a random 10-characters (hex values, 0-f) long string
    for(let x = 0; x < 10; x++) key += Math.random() > .5 ? Math.floor(Math.random()*10).toString() : String.fromCharCode(122 - Math.floor(Math.random()*26));
    return key;
}

app.post('/register', (request, response) => {

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

            User.update({_id:user._id},{$set:{password:hpassword, cpassword:hpassword, key:user.key}}, err => {
                user.password = user.cpassword = user.key = null;
                request.session.user = user;
                return response.redirect('/profile');
            });
        }
    })
})

app.get('/profile', (request, response) => {
    return request.session.user ? response.render('profile', {user:request.session.user, moment: moment}) : response.redirect('/');
})

app.get('/secrets', (request, response) => {

    return request.session.user ?
        Secret.find({}, (err,secrets) => {
            secrets ?
            response.render('secrets', {user:request.session.user, secrets : secrets}) :
            response.render('secrets', {user:request.session.user, secrets : []});
        }) : response.redirect('/');

})

app.post('/login', (request, response) => {

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
})

app.get('/logout', (request, response) => {
    request.session.user = null;
    return response.redirect('/');
})

app.post('/secret/new', (request, response) => {

    let secret = new Secret({user_id: request.session.user._id, text: request.body.text});
    secret.save( err => {
        // if there is an error console.log that something went wrong!
        if(err) for(let error in err.errors) request.flash('errors', err.errors[error].message);
        //else console.log(`Secret successfully added!`);

        return response.redirect('/secrets');
    })
})

app.get('/secret/:secret_id', (request, response) => {

    return request.session.user ?
        Secret.findOne({_id:request.params.secret_id}, (err, secret) => {
            secret ?
                response.render('secret', {user: request.session.user, secret:secret}) :
                response.redirect('back');
        }) : response.redirect('/');

})

app.post('/comment/new/:secret_id', (request, response) => {
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
})

app.get('/secret/destroy/:secret_id', (request, response) => {
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
})