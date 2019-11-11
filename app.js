// here's where the routing will go
var express = require('express');
var body_parser = require('body-parser');


var app = express();
console.log(app);
app.use(body_parser.urlencoded({extended:false}));
app.use(body_parser.json());

app.use(express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// Home page
app.get('/', function(request, response) {
    response.render('landingPage.html');
});

console.log("hello world");

var server = app.listen(8080, function(){
    console.log("Listening on port %d", server.address().port);
});