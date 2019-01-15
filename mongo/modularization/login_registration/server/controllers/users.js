const moment = require('moment');
const bcrypt = require('bcrypt');
const User = require('./../models/user.js');

module.exports = {

	index: (request, response) => {
		
		return request.session.user ? response.redirect('/profile') : response.render('index', {user: {}, form: 0, moment: moment});
	},
	
	register: (request, response) => {
		
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
	},
	
	profile: (request, response) => {
		
		return request.session.user ? response.render('profile', {user:request.session.user}) : response.redirect('/');
	},

	login: (request, response) => {
		
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
	},

	logout: (request, response) => {
		
		request.session.user = null;
		return response.redirect('/');
	}
	
}