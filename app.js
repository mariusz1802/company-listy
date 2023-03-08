const express = require("express");
const fs = require("fs");
const app = express();
let ejs = require("ejs");
let path = require("path");
var bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const { companyRoute } = require("./companyReader");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use("/", companyRoute);
app.use("/", Routes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log("Serwer dziala na porcie 8000");
});

//TODO: do przejrzenia artykuł z postmanem
// https://javascript.plainenglish.io/connect-mongodb-to-node-using-express-and-mongoose-c405d1158c
