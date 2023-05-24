const expresss = require("express");
const router = expresss.Router();
const conn = require("../utils/db");

router.post("/addaccount", async (req, res) => {
  const db = await conn();
  const { username, password, repassword, role } = req.body;
  if (password !== repassword) {
    res.json({
      message: "Password and repassword are not the same",
    });
    return;
  }
  if (!username || !password || !repassword || !role) {
    res.json({
      message: "Please fill all the fields",
    });
    return;
  }
  const result = await db.collection("users").insertOne({
    username,
    password,
    role,
  });
  res.json(result);
});

router.post("/updateaccount", async (req, res) => {
  const db = await conn();
  const { username, password, repassword } = req.body;
  if (password !== repassword) {
    res.json({
      message: "Password and repassword are not the same",
    });
    return;
  }
  if (!username || !password || !repassword) {
    res.json({
      message: "Please fill all the fields",
    });
    return;
  }
  const result = await db.collection("users").updateOne({username:username}, {$set:{password:password}});
  res.json(result);
});

router.post('/login', async (req, res) => {
  const db = await conn();
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({
      message: "Please fill all the fields",
    });
    return;
  }
  const user = await db.collection("users").findOne({username:username, password:password});
  if (!user) {
    res.json({
      message: "Username or password is incorrect",
    });
    return;
  }
  res.json(user);
});
module.exports = router;
