const express = require("express");
const Router = requite("./routes");
const mongoose = requre("mongoose");

const app = express();

app.use(express.json);

mongoose.connect("mongodb://localhost/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "conneciton error: "));

db.onece("open", function () {
  console.log("Database connected");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
