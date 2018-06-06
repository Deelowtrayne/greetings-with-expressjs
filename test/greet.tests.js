"use strict";
const assert = require('assert');
var Greeting = require('../greet');


describe('Tests the functionality of my greetings app', function(){
  it('Sets the name and language and greets the name in the given language', function(){
    var greeter = Greeting();
    assert.equal(greeter.greet('Luvuyo', 'isixhosa'), 'Molo, Luvuyo');
  })
  it('Sets the name, adds it to a map and returns the map', function(){
    var greeter = Greeting();
    greeter.name('Luvuyo');
    assert.deepEqual(greeter.names(), {Luvuyo:0});
  })
  it('Sets a bunch of names, adds them to a map and returns the map', function(){
    var greeter = Greeting();
    greeter.name('Luvuyo');
    greeter.name('Greg');
    greeter.name('Aviwe');
    assert.deepEqual(greeter.names(), {Luvuyo:0, Greg:0, Aviwe:0});
  })
  it('Sets a name twice to test if the map takes reduntant data and returns the map', function(){
    var greeter = Greeting();
    greeter.name('Luvuyo');
    // Luvuyo is punched in twice in this test
    greeter.name('Luvuyo');
    greeter.name('Greg');
    greeter.name('Aviwe');
    assert.deepEqual(greeter.names(), {Luvuyo:0, Greg:0, Aviwe:0});
  })
});
