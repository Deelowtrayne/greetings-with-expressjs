"use strict";
module.exports = function (pool) {

  async function resetMap() {
    let result = await pool.query('TRUNCATE TABLE users');
    return result.rows;
  }

  async function getNames() {
    let result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  async function getNamesLength() {
    let result = await pool.query('SELECT * FROM users');
    return result.rowCount;
  }

  async function sayGreeting(name, language) {
    // validate name
    if (!name || name === "") {
      return;
    }

    let result = await pool.query('SELECT * FROM users WHERE first_name=$1', [name]);
    if (result.rowCount === 0) {
      await pool.query('INSERT INTO users(first_name, greet_count) values ($1, 1)', [name]);
    }
    await pool.query('UPDATE users SET greet_count=greet_count+1 WHERE first_name=$1', [name]);

    if (language === "isixhosa"){
      return "Molo, " + name;
    } else if (language === "english") {
      return "Hello, " + name;
    } else if (language === "afrikaans") {
      return "More, " + name;
    }
  }

  return {
    names: getNames,
    counter: getNamesLength,
    greet: sayGreeting,
    reset: resetMap
  }
}
