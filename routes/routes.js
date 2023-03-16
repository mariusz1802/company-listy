const express = require("express");
const router = express.Router();
const {
  uploadTxt,
  passJSON,
  deleteFromJSON,
  saveToDB,
  updateSentData,
} = require("./controllers");

router.get("/", passJSON);

router.post("/upload", uploadTxt);

router.delete("/delete", deleteFromJSON);

router.post("/save", saveToDB);

router.post("/updateData", updateSentData);

module.exports = router;
