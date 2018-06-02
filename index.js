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
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.render('home');
});

app.post('/greet', function(req, res){
    let name = req.body.nameInput;
    let lang = req.body.languageRadio;
    greeting.greet(name, lang);
    res.redirect('/greeting/' + name);
});

app.post("/greeting", function(req, res){
    let name = message = req.body.nameInput;
    res.redirect('/greeting/' + name);
});

app.get("/greeting/:name", function(req, res){
    let name = req.params.name;
    let lang = greeting.userLang();
    let message = greeting.greet(name, lang);
    let counter = greeting.counter();
    res.render('home', {message, counter});
});

app.listen(PORT, function (err) {
    console.log('App starting on port', PORT);
});
