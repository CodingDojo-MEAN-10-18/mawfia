const users = require('./../controllers/users.js');
const secrets = require('./../controllers/secrets.js');
const comments = require('./../controllers/comments.js');

module.exports = app => {

    app.get('/', (request, response) => {

        users.index(request, response);
    })

    app.post('/register', (request, response) => {

        users.register(request, response);
    })

    app.get('/profile', (request, response) => {

        users.profile(request, response);
    })

    app.post('/login', (request, response) => {

        users.login(request, response);
    })

    app.get('/logout', (request, response) => {

        users.logout(request, response);
    })

    app.get('/secrets', (request, response) => {

        secrets.index(request, response);
    })

    app.post('/secret/new', (request, response) => {

        secrets.new(request, response);
    })

    app.get('/secret/:secret_id', (request, response) => {

        secrets.show(request, response);
    })

    app.get('/secret/destroy/:secret_id', (request, response) => {

        secrets.destroy(request, response);
    })

    app.post('/comment/new/:secret_id', (request, response) => {

        comments.new(request, response);
    })
}