const express = require("express");
const router = express.Router();
const Company = require("../models/comapny.model");

const {
  uploadTxt,
  passJSON,
  deleteFromJSON,
  saveToDB,
  updateSentData,
  loadDB,
  updateEmail,
} = require("./controllers");

router.get("/", passJSON);

router.post("/upload", uploadTxt);

router.delete("/delete", deleteFromJSON);

router.post("/updateData", updateSentData);

router.post("/updateEmail", updateEmail);

router.post("/save", saveToDB);

router.post("/", loadDB);

module.exports = router;
