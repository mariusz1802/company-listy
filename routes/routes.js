const express = require("express");
const router = express.Router();
const {
  uploadTxt,
  passJSON,
  deleteFromJSON,
  saveToDB,
} = require("./controllers");

router.get("/", passJSON);

router.post("/upload", uploadTxt);

router.delete("/delete", deleteFromJSON);

router.post("/save", saveToDB);

module.exports = router;
