"use strict";
module.exports = function () {
  var nameList = {};

  function setName(value) {
    if (value) {
      if (nameList[value] == undefined) {
        nameList[value] = 0;
      }
      nameList[value]++;
      return value;
    }
  }

  function resetMap() {
    nameList = {};
  }

  function getNames() {
    return nameList;
  }

  function getNamesLength() {
    return Object.keys(nameList).length;
  }

  function sayGreeting(username, language) {
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
