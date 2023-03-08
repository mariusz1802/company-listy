const express = require("express");
const app = express();
const router = express.Router();
const dataJSON = require("../output.json");
const companyModel = require("../models/comapny.model");
const { firmy } = require("../companyReader");
const fs = require("fs");

const myJsonInstance = new companyModel(dataJSON);

router.get("/companies", (req, res) => {
  myJsonInstance.save((err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Plik JSON został zapisany do bazy danych!");
    }
  });
});

router.post("/delete", (req, res) => {
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

module.exports = router;
