var express = require("express");

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.get("/cars", (request, response) => {
    // hard-coded user data
    var cars_array =
    [
        {name: "audi_r8_etron.png"},
        {name: "acura_nsx.png"},
        {name: "bmw_i8.png"},
        {name: "ford_gt40.png"},
        {name: "land_rover_sva_dynamic.png"}
    ];
    response.render('cars', {cars: cars_array});
})

app.get("/cats", (request, response) => {
    // hard-coded user data
    var cats_array = ['cat1.png','cat2.png','cat3.png','cat4.png','cat5.png','cat6.png'];
    response.render('cats', {cats: cats_array});
})

app.get("/cars/new", (request, response) => {
    response.render('form');
})

app.listen(8000, () => {
  console.log("listening on port 8000");
});
