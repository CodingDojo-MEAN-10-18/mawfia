var express = require("express");
var app = express();

app.use(express.static(__dirname + "/static"));

app.get("/", function (request, response){
    // hard-coded user data
  
    response.render('index');
})

app.listen(5000, () => {
  console.log("listening on port 5000");
});
