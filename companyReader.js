const express = require("express");
const fs = require("fs");
const app = express();
let path = require("path");
var bodyParser = require("body-parser");

function arrayOfObjects(dane) {
  app.use(express.static(path.join(__dirname, "client")));
  app.use(bodyParser.urlencoded());

  app.use(bodyParser.json());

  const linie = dane.split("\n");

  //Wyrażanie regularne do wyodrebnienia danych z linii
  const expression =
    /^(.*) - (https?:\/\/[\S]+)(?: - (?:E-mail: )?([\w.-]+@[\w.-]+\.[\w.-]+))?/;

  //Tablica na dane firm;
  const companies = [];

  linie.forEach((linia, index) => {
    //Sprawdz RegExpMatch do wyrazanie regularnego
    const RegExpMatch = linia.match(expression);
    if (RegExpMatch) {
      const company = {
        id: index,
        name: RegExpMatch[1],
        www: RegExpMatch[2],
        email: RegExpMatch[3],
        check: false,
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
      console.log("An error occured while writing JOSN Object to File");
      return console.log(err);
    }
    console.log("JSON File has been saved");
  });
}

module.exports = { saveAsJson, arrayOfObjects };
