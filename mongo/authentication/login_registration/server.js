const Promise = require('promise');
const express = require('express');
const app = express();
const server = app.listen(5000);
const io = require('socket.io')(server);
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('express-flash');
const moment = require('moment');
const bcrypt = require('bcrypt');

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.set('trust proxy', 1);
app.use(session({secret: 'victoriassecrect', resave: false, saveUninitialized: true, cookie: { maxAge: 60000} }));
app.use(flash());

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, 'Missing first name.'], minlength: [2, `First Name is too short. (2-25 characters)`], maxlength : [25, 'First Name is too long. (2-25 characters)']},
    last_name : {type: String, required: [true, 'Missing last name.'], minlength : [2, `Last Name is too short. (2-25 characters)`], maxlength : [25, 'Last Name is too long. (2-25 characters)']},
    email: {
        type: String,
        //validate: { validator: e => { return /^\w+@\w+[.]{1}\w+$/.test(e); }, message: `'{VALUE}' is not a valid email!` },
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
      }
}, {timestamps: true })

mongoose.connect('mongodb://localhost/login_registration');
mongoose.model('User', UserSchema);
const User = mongoose.model('User');

app.get('/', (request, response) => {

    return request.session.user ? response.redirect('/profile') : response.render('index', {user: {}, form: 0, moment: moment});
})

app.post('/register', (request, response) => {

    let user = new User();
    for(let field in request.body) user[field] = request.body[field];

    user.save( err => {
        if(err) {
            for(let error in err.errors) request.flash('errors', err.errors[error].message);
            return response.render('index', {user: request.body, form: 1, moment: moment});
        }
        else {

            bcrypt.hash(request.body.password, 10).
                then( hpassword => {
                        User.update({_id:user._id},{$set:{password:hpassword, cpassword:hpassword}}, err => {
                            user.password = user.cpassword = null;
                            request.session.user = user;
                            return response.redirect('/profile');
                        });
                }).catch( error => console.log(error) );
        }
    })
})

app.get('/profile', (request, response) => {
    return request.session.user ? response.render('profile', {user:request.session.user}) : response.redirect('/');
})

app.post('/login', (request, response) => {

    User.findOne({email:request.body.email},(err, user) => {

        if(err) for(let error in err.errors) request.flash('errors', err.errors[error].message);

        if(user)
            bcrypt.compare(request.body.password, user.password).then( result => {
                if(result){
                    user.password = user.cpassword = null;
                    request.session.user = user;
                    return response.redirect('/profile');
                }
                else {
                    request.flash('errors', 'Invalid password entered.'); // Not sure what condition will trigger this error
                    return response.redirect('/');
                }
            }).catch( error => { request.flash('errors', 'Invalid password entered.'); return response.redirect('/'); });
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

/*
function(e) {
    //console.log(v);
      return new Promise((resolve, reject) => {
          User.find({email:e},(err,email) => { err ? reject(err) : resolve(email.length === 0 && /^\w+@\w+[.]{1}\w+$/.test(e));

          });
      });
  }
*/