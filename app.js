if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
// 引入外部套件
const express = require("express");
const session = require("express-session");
const app = express();
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const flash = require("connect-flash");

// 引入內部檔案
require("./config/mongoose");
const port = process.env.PORT;
const routes = require("./routes");
const usePassport = require("./config/passport");
// public - bootswatch
app.use(express.static("public"));
// views
app.engine(
  "hbs",
  handlebars.engine({ defaultLayout: "main", extname: ".hbs" })
);
app.set("view engine", "hbs");
//session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
// body parser
app.use(express.urlencoded({ extended: true }));
// methodOverride
app.use(methodOverride("_method"));
// passport
usePassport(app);
// flash
app.use(flash());
// authennticate
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.fontawesome = process.env.FONTAWESOME;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});
// routes
app.use(routes);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
});
