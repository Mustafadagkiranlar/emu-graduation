var cors = require('cors');
const express = require("express");
const { json } = require("express");
const bodyParser = require("body-parser");
const plates = require("./routes/plates");
const users = require("./routes/users");

const app = express();
app.use(cors());
const port = 8000;

app.use(bodyParser.json());

app.use('/', plates);
app.use('/', users);

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}`);
});
