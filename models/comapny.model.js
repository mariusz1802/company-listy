const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    id  : {type: String, required : true},
    name : {type: String, required : true},
    www : {type: String, required : true},
    email : {type:  String, required : true},
})


const Company = mongoose.model('Company', companySchema);

module.exports = Company
