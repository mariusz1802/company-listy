const express = require("express");
const app = express();
const router = express.Router();
const dataJSON = require("../output.json");
const companyModel = require("../models/comapny.model");

router.get("/companies", async (req, res) => {
  console.log("manio");
  dataJSON.map((el) => {
    const company = new companyModel(el);
    company.save();
  });
});

module.exports = router;
