const express = require("express");
const fs = require("fs");
const app = express();
let ejs = require("ejs");
let path = require("path");

//mongoose
main().catch((err) => console.log(err));

async function main() {
  const companySchema = new mongoose.Schema({
    name: String,
  });

  const Company = mongoose.model("Company", companySchema);

  const bomba = new Company({ name: "Bomba" });
  console.log(bomba.name);

  await bomba.save();

  const companies = await Company.find();
  console.log(companies);
}

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
      name: dopasowanie[1],
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

app.use(express.static(path.join(__dirname, "public")));

app.listen(3000, () => {
  console.log("Serwer dziala na porcie 3000");
});
