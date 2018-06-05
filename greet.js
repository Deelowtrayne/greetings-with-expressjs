"use strict";
module.exports = function (pool) {
 
  async function setName(value) {
    if (value && value !== '') {
      let result = await pool.query('SELECT * FROM users WHERE first_name=$1', [value]);
      if (result.rowCount === 0) {
        await pool.query('INSERT INTO users(first_name, greet_count) values($1, 1)', [value]);
      }
      await pool.query('UPDATE users SET greet_count=greet_count+1 WHERE first_name=$1', [value]);
      return value;
    }
  }

  async function resetMap() {
    return pool.query('DELETE * FROM users');
  }

  async function getNames() {
    return await pool.query('SELECT * FROM users');
  }

  async function getNamesLength() {
    let result = await pool.query('SELECT * FROM users');
    return result.rowCount;
  }

  function sayGreeting(username, language) {
    // validate name
    let name = setName(username);

    if (language === "isixhosa")
      return "Molo, " + name;
    else if (language === "english")
      return "Hello, " + name;
    else if (language === "afrikaans")
      return "More, " + name;
  }

  return {
    names: getNames,
    counter: getNamesLength,
    greet: sayGreeting,
    reset: resetMap
  }
}
