const expresss = require("express");
const router = expresss.Router();
const conn = require("../utils/db");

router.get("/getvehicles", async (req, res) => {
  const db = await conn();
  const vehicles = await db.collection("records").find().toArray();
  res.json(vehicles);
});

router.get("/getlatestvehicle", async (req, res) => {
  const db = await conn();
  const vehicles = await db.collection("camplate").find().toArray();
  res.json(vehicles);
});

module.exports = router;
