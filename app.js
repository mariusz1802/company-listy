const express = require("express");
const fs = require("fs");
const app = express();
let ejs = require("ejs");
let path = require("path");
// const companyRouter = require("./routes/companies");
const { v4: uuidv4 } = require("uuid");
var bodyParser = require("body-parser");
const Routes = require("./routes/routes");

// const companies = require("./output.json");
const { clearScreenDown } = require("readline");
const { getElementsByTagType } = require("domutils");
const e = require("express");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "client")));

// app.use("/", companyRouter);
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use("/", Routes);

//odczytaj dane z data.txt
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

app.post("/check", (req, res) => {
  const idToDelete = req.body.id;
  console.log("ID to delete: ", idToDelete);
  const findID = firmy.findIndex((el) => el.id == idToDelete);
  console.log(findID);

  if (findID !== -1) {
    console.log("ZNalazlem cos");
    const newArr = firmy.map((el) => {
      if (el.id === findID) {
        {
          el.check = true;
          return;
        }
      }
    });
    console.log(newArr);
  } else {
    console.log("niE ZNALAZLEM TEGO ID");
  }
  res.redirect("back");
});

app.post("/delete", (req, res) => {
  const idToDelete = req.body.id;
  console.log("ID to delete: ", idToDelete);
  const findID = firmy.findIndex((el) => el.id == idToDelete);
  console.log(findID);

  if (findID !== -1) {
    firmy.splice(findID, 1);
    const jsonFimy = JSON.stringify(firmy);
    fs.writeFile("output.json", jsonFimy, "utf8", function (err) {
      if (err) {
        console.log("An error has occured while writing JOSN Object to File");
      }
      console.log("New JSON file has been overwritten after delete");
    });
    res.redirect("back");
  } else {
    console.log("nie znaleziono obiektu o podanym ID.");
  }
});

app.get("/", (req, res) => {
  res.render("index", { firmy: firmy });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log("Serwer dziala na porcie 8000");
});
