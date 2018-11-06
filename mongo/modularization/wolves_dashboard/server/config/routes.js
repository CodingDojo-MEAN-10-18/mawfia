const wolves = require('./../controllers/wolves.js');

module.exports = (app) => {

    app.get(['/', '/wolves'], (request, response) => {
        wolves.index(request, response);
    })

    app.get('/wolf/new', (request, response) => {
        wolves.new(request, response);
    })

    app.get('/wolf/:wolf_id', (request, response) => {
        wolves.show(request, response);
    })

    app.post('/wolf/new', (request, response) => {
        wolves.create(request, response);
    })

    app.post('/wolf/:wolf_id', (request, response) => {
        wolves.update(request, response);
    })

    app.get('/wolf/edit/:wolf_id', (request, response) => {
        wolves.edit(request, response);
    })

    app.get('/wolf/destroy/:wolf_id', (request, response) => {
        wolves.destroy(request, response);
    })
}