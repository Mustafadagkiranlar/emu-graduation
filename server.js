const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const plates = require("./routes/plates");
const users = require("./routes/users");

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.use('/', plates);
app.use('/', users);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
