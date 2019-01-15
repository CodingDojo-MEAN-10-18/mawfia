const users = require('./../controllers/users.js');

module.exports = (app) => {

	app.get('/', (request, response) => {

		users.index(request, response);
	}),

	app.post('/register', (request, response) => {

		users.register(request, response);
	}),

	app.get('/profile', (request, response) => {
		
		users.profile(request, response);
	}),

	app.post('/login', (request, response) => {

		users.login(request, response);
	}),

	app.get('/logout', (request, response) => {
		
		users.logout(request, response);
	})
	
}