"use strict";
const express = require('express');
var app = express();
var exphb = require('express-handlebars');

const PORT = process.env.PORT || 3333;
const connectionString = process.env.DATABASE_URL || 'postgresql://luvuyo:coder123@localhost:5432/Greetings';

const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({ connectionString });

let Greeting = require('./greet');
const greeting = Greeting(pool);

// import handlebars and body-parser
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

app.use(express.static('public'));
// handlebars
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        'times': function () {
            if (this.greet_count === 1) {
                return ' has only been greeted once.';
            }
            return ' has been greeted ' + this.greet_count + ' times.';
        }
    }
}));

app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async function (req, res, next) {
    try {
      res.render('home', {
        counter: await greeting.counter()
      });
    } catch (err) {
        next(err);
    }
});

app.post("/greeting", async function (req, res, next) {
    try {
      let name = req.body.nameInput;
      let lang = req.body.languageRadio;
      res.render('home', {
          message: await greeting.greet(name, lang),
          counter: await greeting.counter(),
      });
    } catch(err) {
      return next(err);
    }
});

// greeting with a URL
app.get("/greeting/:name/:language", async function (req, res, next) {
    try {
      let name = req.params.name;
      let lang = req.params.language;
      res.render('home', {
          message: await greeting.greet(name, lang),
          counter: await greeting.counter(),
      });
    } catch (err) {
      return next(err)
    }
});

app.get("/greetings", async function (req, res, next) {
    try {
        res.render('greetings', {
          users: await greeting.names()
        });
    }
    catch (err) {
        return next(err);
    }
});

app.listen(PORT, function (err) {
    console.log('App starting on port', PORT);
});
