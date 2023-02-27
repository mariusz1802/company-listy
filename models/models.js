let mongoose = require('mongoose'),
Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;


mongoose.connect('mongodb://127.0.0.1:27017/test');


let CompanyDatabase = new Schema({
    name : {type : String},
    www : {type : String},
    email : {type : String},
    
})