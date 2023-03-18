const express = require("express");
const router = express.Router();
const Company = require("../models/comapny.model");

const {
  uploadTxt,
  passJSON,
  deleteFromJSON,
  saveToDB,
  updateSentData,
  chooseData,
} = require("./controllers");

router.get("/", passJSON);

router.post("/upload", uploadTxt);

router.delete("/delete", deleteFromJSON);

router.post("/save", saveToDB);

router.post("/updateData", updateSentData);

router.get("/file", async (req, res) => {
  try {
    const file = await Company.findById(req.params);
    res.render("file", { file });
  } catch (err) {
    console.log(err);
    res.status(500).send("Błąd serwera");
  }
});

router.post("/", chooseData);

module.exports = router;
