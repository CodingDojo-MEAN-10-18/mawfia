const mongoose = require('./../config/mongoose.js');

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

mongoose.model('User', UserSchema);
const User = mongoose.model('User');
module.exports = User;