const express = require("express");
const router = express.Router();
// const companies = require("../data/companies.json");
const Companies = require("../models/comapny.model");

router.get("/", (req, res) => {
  res.json(companies);
});

// router.delete('/api/companies/:id', async (req, res) => {
//     try {
//         const element = await Element.findByIdAndDelete(req.params.id);
//         if(!element){
//             return res.status(404).send();
//         }
//         res.send(element);
//     }catch(error){
//         res.status(500).send(error);
//     }
// })

module.exports = router;
