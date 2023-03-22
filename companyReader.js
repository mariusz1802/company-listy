const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function arrayOfObjects(dane) {
  const linie = dane.split("\n");

  const expression =
    /^(.*) - (https?:\/\/[\S]+)(?: - (?:E-mail: )?([\w.-]+@[\w.-]+\.[\w.-]+))?/i;

  const companies = [];

  linie.forEach((linia) => {
    const RegExpMatch = linia.match(expression);
    if (RegExpMatch) {
      const company = {
        id: uuidv4(),
        name: RegExpMatch[1],
        www: RegExpMatch[2],
        email: RegExpMatch[3],
        sent: false,
      };

      companies.push(company);
    }
  });
  return companies;
}

function saveAsJson(element) {
  const jsonFirmy = JSON.stringify(element);
  fs.writeFile("output.json", jsonFirmy, "utf8", function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("JSON File has been saved");
  });
}

module.exports = { saveAsJson, arrayOfObjects };
