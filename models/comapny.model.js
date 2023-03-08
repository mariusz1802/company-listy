const mongoose = require("mongoose");
const dataJSON = require("../output.json");
const companySchema = new mongoose.Schema({
  id: { type: Number, required: false },
  name: { type: String, required: false },
  www: { type: String, required: false },
  email: { type: String, required: false },
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
