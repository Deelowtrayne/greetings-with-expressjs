const express = require('express');
var app = express();
var exphb = require('express-handlebars');
const PORT = process.env.PORT || 3333;

let Greeting = require('./greet');
const greeting = Greeting();
// import handlebars and body-parser
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(express.static('public'));
// handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    var name = req.body.nameInput;
    greeting.
    res.render('home', {message:name });
});

app.post("/greetings", function(req, res){
    var name = message = req.body.nameInput;
    res.redirect('/greetings/' + name);
});

app.get("/greetings/:name", function(req, res){
    var message = req.params.name;
    res.render('home', {message});
});

app.listen(PORT, function (err) {
    console.log('App starting on port', PORT);
});
