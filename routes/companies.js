const express = require("express");
const router = express.Router();
const companies = require("../output.json");
const Companies = require("../models/comapny.model");
const app = express();

router.get("/companies", (req, res) => {
  const companies = new Companies();
  res.json(companies);
});

module.exports = router;
