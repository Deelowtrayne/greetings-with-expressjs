"use strict";
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
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        'times': function(){
            if (this === 1) {
                return ' has only been greeted once.'; 
            }
            return ' has been greeted ' + this + ' times.';
        },
    }
}));

app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    let counter = greeting.counter();
    res.render('home', {counter});
});

app.post('/greeting', function(req, res){
    let name = req.body.nameInput;
    let lang = req.body.languageRadio;
    let context = {
        message: greeting.greet(name, lang),
        counter: greeting.counter(),
    }
    res.render('home', context);
});

app.get("/greetings", function(req, res){
    let users = greeting.names();
    res.render('greetings', {users});
});
// greeting with a URL
app.get("/greeting/:name/:language", function(req, res){
    let name = req.params.name;
    let lang = req.params.language;
    let context = {
        message: greeting.greet(name, lang),
        counter: greeting.counter(),
    }
    res.render('home', context);
});

app.listen(PORT, function (err) {
    console.log('App starting on port', PORT);
});
