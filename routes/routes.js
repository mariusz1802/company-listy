const express = require("express");
const router = express.Router();
const { uploadTxt ,passJSON, deleteFromJSON} = require("./controllers")


router.get("/", passJSON);

router.post("/upload", uploadTxt);

router.delete("/delete", deleteFromJSON);


module.exports = router;
