const express = require("express");
const app = express();
let path = require("path");
var bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use("/", Routes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log("Serwer dziala na porcie 8000");
});

//TODO: do przejrzenia artykuł z postmanem
// https://javascript.plainenglish.io/connect-mongodb-to-node-using-express-and-mongoose-c405d1158c
