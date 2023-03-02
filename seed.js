const fs = require('fs');
const Company = require("./models/comapny.model");
const db = require('./database')





const companies = JSON.parse(fs.readFileSync('./data/companies.json', 'utf8'))

db.once('open', async() => {
    try{
        await Company.deleteMany({});
        await Company.insertMany(companies);
        console.log('Data imported successfully!');
        process.exit();
    }catch(error){
        console.log(error);
        process.exit(1);
    }
})