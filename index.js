"use strict";
const express = require('express');
var app = express();
var exphb = require('express-handlebars');

const PORT = process.env.PORT || 3333;
//const connectionString = process.env.DATABASE_URL

const pg = require('pg');
const Pool = pg.Pool;

const pool = new Pool({
    connectionString: 'postgresql://luvuyo:coder123@localhost:5432/Greetings'
});

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
            if (this === 1) {
                return ' has only been greeted once.';
            }
            return ' has been greeted ' + this.greet_count + ' times.';
        },
    }
}));

app.set('view engine', 'handlebars');

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async function (req, res) {
    let counter = greeting.counter();
    res.render('home', { counter });
});

app.post('/greeting', async function (req, res) {
    let name = req.body.nameInput;
    let lang = req.body.languageRadio;
    let context = {
        message: greeting.greet(name, lang),
        counter: greeting.counter(),
    }
    res.render('home', context);
});

app.get("/greetings", async function (req, res, next) {
    // let users = greeting.names();
    try {
        let result = await pool.query('select * from users');
        let users = result.rows;
        res.render('greetings', { users });
    }
    catch (err) {
        return next(err);
    }
});
// greeting with a URL
app.get("/greeting/:name/:language", function (req, res) {
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
