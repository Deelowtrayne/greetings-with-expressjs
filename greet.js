module.exports = function (a) {
  var name = "";
  var lang = "";
  var nameList = {};

  function setName(value) {
    if (value) {
      if (nameList[value] == undefined) {
        nameList[name] = 0;
      }
      name = value;
    }
  }

  function setLanguage(value) {
    lang = value;
  }

  function resetMap() {
    nameList = {};
  }

  function getName() {
    return name;
  }

  function getLanguage() {
    return lang;
  }

  function getNames() {
    return nameList;
  }

  function getNamesLength() {
    return Object.keys(nameList).length;
  }

  function sayGreeting(username, language) {
    setName(username  );
    setLanguage(language);
    
    if (lang === "isixhosa")
      return "Molo, " + name;
    else if (lang === "english")
      return "Hello, " + name;
    else if (lang === "afrikaans")
      return "More, " + name;
  }

  return {
    name: setName,
    language: setLanguage,
    names: getNames,
    counter: getNamesLength,
    greet: sayGreeting,
    //get name and languageRadio
    userName: getName,
    userLang: getLanguage,
    reset: resetMap
  }
}
