const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const Routes = require("./routes/routes");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");

app.use(fileUpload());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/", Routes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log("Serwer dziala na porcie 8000");
});
