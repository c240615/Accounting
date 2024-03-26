if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("index");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
