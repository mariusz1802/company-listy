const { data } = require("cheerio/lib/api/attributes");
const mongoose = require("mongoose");
const dataJSON = require("../output.json");
const companySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  www: { type: String, required: true },
  email: { type: String, required: true },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
