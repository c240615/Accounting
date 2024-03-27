if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// 引入外部套件
const express = require("express");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
// 引入內部檔案
require("./config/mongoose");
const app = express();
const port = process.env.PORT;

// public - bootswatch
app.use(express.static("public"));
// views
app.engine(
  "hbs",
  handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", "hbs");
// body parser
app.use(express.urlencoded({ extended: true }));
// methodOverride
app.use(methodOverride("_method"));

// routes
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
