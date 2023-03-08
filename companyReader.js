const express = require("express");
const fs = require("fs");
const app = express();
let path = require("path");
var bodyParser = require("body-parser");

const companyRoute = express.Router();

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

const dane = fs.readFileSync("./data.txt", "utf8");
//Podziel dane na linie
const linie = dane.split("\n");

//Wyrażanie regularne do wyodrebnienia danych z linii
const wyrazenie =
  /^(.*) - (https?:\/\/[\S]+) - E-mail: ([\w.-]+@[\w.-]+\.[\w.-]+)/;

//Tablica na dane firm;
const firmy = [];

linie.forEach((linia, index) => {
  //Sprawdz dopasowanie do wyrazanie regularnego
  const dopasowanie = linia.match(wyrazenie);
  if (dopasowanie) {
    const firma = {
      id: index,
      name: dopasowanie[1],
      www: dopasowanie[2],
      email: dopasowanie[3],
      check: false,
    };

    firmy.push(firma);
  }
});

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

saveAsJson(firmy);

companyRoute.get("/", (req, res) => {
  res.render("index", { firmy: firmy });
});

module.exports = { companyRoute, firmy };
