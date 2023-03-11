const express = require("express");
const app = express();
const router = express.Router();
const dataJSON = require("../output.json");
const companyModel = require("../models/comapny.model");
const { saveAsJson, arrayOfObjects } = require("../companyReader");
const fs = require("fs");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

// const firmy = arrayOfObjects();

const myJsonInstance = new companyModel(dataJSON);

router.get("/", (req, res) => {
  fs.readFile("output.json", (err, data) => {
    if (err) throw err;
    let companies = JSON.parse(data);
    res.render("index", { firmy: companies });
  });
});

router.post("/upload", (req, res) => {
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
    res.send("Plik teksotowy zostal zaladowany i przetworzony");
  });
});

router.get("/companies", (req, res) => {
  myJsonInstance.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Plik JSON został zapisany do bazy danych!");
    }
  });
});

router.delete("/delete", (req, res) => {
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
});

module.exports = router;
