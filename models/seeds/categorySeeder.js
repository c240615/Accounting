const db = require("../../config/mongoose");
// model
const Category = require("../category");
// data
const categoryData = require("../datas/category.json");

db.once("open", () => {
  Promise.all(
    categoryData.map((eachCategory) => {
      return Category.create({
        name: eachCategory.name,
        icon: eachCategory.icon,
      });
    })
  ).then(() => {
    console.log("category done");
    process.exit();
  });
});
