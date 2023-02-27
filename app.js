const express = require("express");
const fs = require("fs");
const cheerio = require("cheerio");
const app = express();
let ejs = require("ejs");
let path = require("path");

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mondodb://127.0.0.1:27017/test");
}

const companySchema = new mongoose.Schema({
  nameComapny: String,
  www: String,
  email: String,
});

const Company = mongoose.model("Company", companySchema);

app.set("view engine", "ejs");

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
      nameCompany: dopasowanie[1],
      www: dopasowanie[2],
      email: dopasowanie[3],
    };

    firmy.push(firma);
  }
});

const firmaDB = new Company({
  nameCompany: "Bomba web design",
  www: "www.bombadesign.pl",
  email: "kontakt@bombadesign.pl",
});

const firmys = Company.find();

console.log(firmys);

app.get("/", (req, res) => {
  res.render("index", { firmy: firmy });
});

firmy.forEach((firma) => {
  // console.log("nazwa firmy:", firma.nameCompany);
  // console.log("adres www firmy:", firma.www);
  // console.log("adres email:", firma.email);
  // console.log("--------------------------");
});

app.get("/", (req, res) => {
  const html = fs.readFileSync("./public/index.html");
  const $ = cheerio.load(html);

  const tabela = $("#tabela");
  const tbody = $("tbody"[0]);

  res.send($.html());
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Serwer dziala na porcie 3000");
});
