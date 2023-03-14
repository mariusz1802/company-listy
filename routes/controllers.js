const fs = require("fs");
const { arrayOfObjects, saveAsJson } = require("../companyReader");
const mongoose = require("mongoose");

const mydata = require("../output.json");

mongoose
  .connect("mongodb://localhost/mydatatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Połączono z bazą danych");
    saveToDB;
  })
  .catch((error) => {
    console.log("blad polaczenia z baza danych: ", error);
  });

const Company = require("../models/comapny.model.js");

const passJSON = (req, res) => {
  fs.readFile("output.json", (err, data) => {
    if (err) throw err;
    let companies = JSON.parse(data);
    res.render("index", { firmy: companies });
  });
};

const saveToDB = (req, res) => {
  const json = fs.readFileSync("output.json");
  const data = JSON.parse(json);

  const collection = mongoose.connection.db.collection("mycollection");

  collection.insertMany(data, (err, result) => {
    if (err) {
      console.error("Błąd zapisu danych", err);
    } else {
      console.log("Dane zostały zapisane w bazie danych.");
    }
  });
};

const uploadTxt = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Nie wybrano pliku do załadowania");
  }
  const fileToUpload = req.files.fileToUpload;
  const fileName = fileToUpload.name;
  const filePath = "./uploads/" + fileName;

  fileToUpload.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    //wczytaj plik tekstowy
    const fileContent = fs.readFileSync(filePath, "utf8");
    const companiesTransformed = arrayOfObjects(fileContent);
    saveAsJson(companiesTransformed);
    res.redirect("back");
  });
};

const deleteFromJSON = (req, res) => {
  const idToDelete = req.query.id;
  console.log("ID to delete: ", idToDelete);
  fs.readFile("output.json", (err, data) => {
    if (err) throw err;
    let companies = JSON.parse(data);
    const findID = companies.findIndex((el) => el.id == idToDelete);
    if (findID !== -1) {
      companies.splice(findID, 1);
      const jsonFimy = JSON.stringify(companies);
      fs.writeFile("output.json", jsonFimy, "utf8", function (err) {
        if (err) {
          console.log("An error has occured while writing JOSN Object to File");
          res.status(404);
        }
        console.log("New JSON file has been overwritten after delete");
        res.status(200);
      });
    } else {
      console.log("nie znaleziono obiektu o podanym ID.");
    }
  });
};

module.exports = {
  uploadTxt,
  passJSON,
  deleteFromJSON,
  saveToDB,
};
