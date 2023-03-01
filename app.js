const express = require("express");
const fs = require("fs");
const app = express();
let ejs = require("ejs");
let path = require("path");
let mongoose = require("mongoose");

//mongoose

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "client")));

//odczytaj dane z data.txt
const dane = fs.readFileSync("./data.txt", "utf8");

//Podziel dane na linie
const linie = dane.split("\n");

//Wyrażanie regularne do wyodrebnienia danych z linii
const wyrazenie =
  /^(.*) - (https?:\/\/[\S]+) - E-mail: ([\w.-]+@[\w.-]+\.[\w.-]+)/;

//Tablica na dane firm;
const firmy = [];

linie.forEach((linia) => {
  //Sprawdz dopasowanie do wyrazanie regularnego
  const dopasowanie = linia.match(wyrazenie);

  if (dopasowanie) {
    const firma = {
      name: dopasowanie[1],
      www: dopasowanie[2],
      email: dopasowanie[3],
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

const JSONdata = fs.readFileSync("./output.json", "utf8");

const parsed = JSON.parse(JSONdata);

saveAsJson(firmy);

app.get("/", (req, res) => {
  res.render("index", { firmy: parsed });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Serwer dziala na porcie 3000");
});
