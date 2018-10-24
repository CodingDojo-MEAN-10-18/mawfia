var express = require("express");

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/static"));

app.get(['/cats','/:cat_id'], (request, response) => {
    // hard-coded user data
    const cats_array = [
        {name: 'Cuddles', picture: 'cat1.png', food: 'spaghetti', age: 9, sleep: ['couch','bed']},
        {name: 'Misty', picture: 'cat2.png', food: 'ice cream', age: 11, sleep: ['pillow', 'blanket']},
        {name: 'Riku', picture: 'cat3.png', food: 'salmon', age: 3, sleep: ['bed','rug']},
        {name: 'Garfield', picture: 'cat4.png', food: 'top ramen', age: 5, sleep: ['window','under bed']},
        {name: 'Mr Bigglesworth', picture: 'cat5.png', food: 'cat food', age: 15, sleep: ['bed','sofa']},
        {name: 'Chloe', picture: 'cat6.png', food: 'purina cat food', age: 10, sleep: ['blanket','floor']}
    ];
    const cat_id = request.params.cat_id;
    cat_id == null ? response.render('cats', {cats: cats_array}) : response.render('details', {cat: cats_array.find( (c) => c.name == cat_id)});
})

app.listen(8000, () => {
  console.log("listening on port 8000");
});