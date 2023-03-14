const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  id: Number,
  name: String,
  www: String,
  email: String,
});

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
