const expresss = require("express");
const router = expresss.Router();
const conn = require("../utils/db");
const crypto = require("crypto");

let hasPsw, rehasPsw;

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}

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
  // hash password
  hashPassword(password).then(async (hashedPassword) => {
    const result = await db.collection("users").insertOne({
      username,
      password: hashedPassword,
      role,
    });
    res.json(result);
  });
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
  // hash password
  hashPassword(password).then(async (hashedPassword) => {
    const result = await db
      .collection("users")
      .updateOne(
        { username: username },
        { $set: { password: hashedPassword } }
      );
    res.json(result);
  });
});

router.post("/login", async (req, res) => {
  const db = await conn();
  const { username, password } = req.body;
  if (!username || !password) {
    res.json({
      result: 0,
      message: "Please fill all the fields",
    });
    return;
  }
  // hash password
  hashPassword(password).then(async (hashedPassword) => {
    const user = await db
      .collection("users")
      .findOne({ username: username, password: hashedPassword });
      if (!user) {
        res.json({
          result: 0,
          message: "Username or password is incorrect",
        });
        return;
      }
      res.json({
        result: 1,
        user,
      });
  });

});
module.exports = router;
