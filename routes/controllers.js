const fs = require("fs");
const { arrayOfObjects, saveAsJson } = require("../companyReader");
const mongoose = require("mongoose");
const mydata = "output.json";

mongoose
  .connect("mongodb://localhost/mydatatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Połączono z bazą danych");
    saveToDB;
  })
  .catch((error) => {
    console.log("blad polaczenia z baza danych: ", error);
  });

const passJSON = (req, res) => {
  fs.readFile("output.json", (err, data) => {
    if (err) throw err;
    let companies = JSON.parse(data);
    res.render("index", { firmy: companies });
  });
};

const saveToDB = (req, res) => {
  const json = fs.readFileSync("output.json");
  const data = JSON.parse(json);
  const dbName = req.body.dbName;

  const collection = mongoose.connection.db.collection(dbName);

  collection.insertMany(data, (err) => {
    if (err) {
      console.error("Błąd zapisu danych", err);
    } else {
      console.log("Dane zostały zapisane w bazie danych.");
      res.redirect("back");
    }
  });
};

const loadDB = async (req, res) => {
  const dbNameLoad = req.body.dbNameLoad;
  const collection = mongoose.connection.db.collection(dbNameLoad);
  console.log(collection);

  collection.find({}).toArray((error, data) => {
    if (error) {
      console.log(error);
    } else {
      const myData = data;
      res.render("index", { firmy: myData });
    }
  });
};

const uploadTxt = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("Nie wybrano pliku do załadowania");
  }
  const fileToUpload = req.files.fileToUpload;
  const fileName = fileToUpload.name;
  const filePath = "./uploads/" + fileName;

  fileToUpload.mv(filePath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    //wczytaj plik tekstowy
    const fileContent = fs.readFileSync(filePath, "utf8");
    const companiesTransformed = arrayOfObjects(fileContent);
    saveAsJson(companiesTransformed);
    res.redirect("back");
  });
};

//TODO:updateSentData and updateEmail to refactorization cause of redundation
const updateSentData = (req, res) => {
  const idArray = req.body.idArr;
  const JSONData = JSON.parse(fs.readFileSync(mydata, "utf8"));

  const updateData = JSONData.map((item) => {
    if (idArray.includes(item.id)) {
      return { ...item, sent: true };
    }

    return item;
  });
  fs.writeFileSync(mydata, JSON.stringify(updateData));
  res.send("dane send zostały zaktualizwane");
};

const updateEmail = (req, res) => {
  const idEl = req.body.elId;
  const emailData = req.body.inputValue;
  console.log(idEl);
  console.log(emailData);
  const JSONData = JSON.parse(fs.readFileSync(mydata, "utf8"));

  const updateData = JSONData.map((item) => {
    if (idEl.includes(item.id)) {
      return { ...item, email: emailData };
    }
    return item;
  });
  fs.writeFileSync(mydata, JSON.stringify(updateData));
  res.send("dane email zostały zakutalizowane");
};

const deleteFromJSON = (req, res) => {
  const idToDelete = req.query.id;
  console.log("ID to delete: ", idToDelete);
  fs.readFile("output.json", (err, data) => {
    if (err) throw err;
    let companies = JSON.parse(data);
    const findID = companies.findIndex((el) => el.id == idToDelete);
    if (findID !== -1) {
      companies.splice(findID, 1);
      const jsonFimy = JSON.stringify(companies);
      fs.writeFile("output.json", jsonFimy, "utf8", function (err) {
        if (err) {
          console.log("An error has occured while writing JOSN Object to File");
          res.status(404);
        }
        console.log("New JSON file has been overwritten after delete");
        res.status(200);
      });
    } else {
      console.log("nie znaleziono obiektu o podanym ID.");
    }
  });
};

module.exports = {
  uploadTxt,
  passJSON,
  deleteFromJSON,
  updateSentData,
  saveToDB,
  loadDB,
  updateEmail,
};
