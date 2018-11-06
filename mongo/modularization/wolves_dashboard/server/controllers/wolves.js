const Wolf = require('./../models/wolf.js');
const moment = require('moment');

module.exports = {

    index :  (request, response) => {

        Wolf.find({}, (err, wolves) => {
            if(err){
                console.log(`Error ${err} occured.`);
                return response.render('index', {wolves:[]});
            }
            else return response.render('index', {wolves: wolves, moment: moment});
        })
    },

    new : (request, response) => { return response.render('new'); },

    create : (request, response) => {

        let wolf = new Wolf({name: request.body.name, age: request.body.age, weight: request.body.weight});
        wolf.save( err => {
            // if there is an error console.log that something went wrong!
            if(err) {
              //console.log(err);
              for(let key in err.errors) request.flash('errors', err.errors[key].message);
              return response.redirect('/wolf/new');
            } else { // else console.log that we did well and then redirect to the root route
              console.log(`${wolf.name} successfully added to the pack!`);
              return response.redirect('/wolves');
            }
        })
    },

    show : (request, response) => {

        Wolf.findOne({_id:request.params.wolf_id}, (err, wolf) => {
            if(err){
                console.log(`Error ${err} occured.`);
                request.flash('errors', "Wolf not found.");
                return response.redirect('/');
            }
            else return response.render('wolf', {wolf: wolf});
        })
    },

    edit : (request, response) => {

        Wolf.findOne({_id:request.params.wolf_id}, (err, wolf) => {
            if(err){
                console.log(`Error ${err} occured.`);
                request.flash('errors', "Wolf not found.");
                return response.redirect('/');
            }
            else return response.render('edit', {wolf: wolf});
        })
    },

    update : (request, response) => {

        Wolf.updateOne({_id:request.params.wolf_id}, {name:request.body.name, age:request.body.age, weight:request.body.weight}, {runValidators: true}, err => {
            if(err){
                for(let key in err.errors) request.flash('errors', err.errors[key].message);
                return response.redirect(`/wolf/edit/${request.params.wolf_id}`);
            }
            else {
                console.log(`${request.body.name} successfully updated!`);
                return response.redirect('/wolves');
            }
        })
    },

    destroy : (request, response) => {

        Wolf.remove({_id:request.params.wolf_id}, (err, wolf) => {
            if(err){
                console.log(`Error ${err} occured.`);
                for(let key in err.errors) request.flash('errors', err.errors[key].message);
            }
            else{
                request.flash("errors", `Wolf successfully deleted.`);
            }

            return response.redirect('/wolves');
        })
    }
}