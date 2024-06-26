const express = require("express");
const router = express.Router();

const Record = require("../../models/record");
const Category = require("../../models/category");

// 新增
router.get("/new", (req, res) => {
  Category.find()
    .lean()
    .sort({ _id: "asc" })
    .then((categories) => {
      res.render("new", { categories });
    })
    .catch((e) => {
      console.log(e);
    });
});
// 提交新 record
router.post("/", (req, res) => {
  const userId = req.user._id;
  const { name, date, amount, category } = req.body;
  Category.findOne({ name: category })
    .lean()
    .then((data) => {
      return Record.create({
        name,
        date,
        amount,
        categoryId: data._id,
        userId,
      });
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => {
      console.log(e);
    });
});
// 編輯頁
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id; // user 的 id
  const _id = req.params.id; // record 的 id
  Category.find()
    .lean()
    .then((categories) => {
      return Record.findById({ _id, userId })
        .lean()
        .then((record) => {
          categories.forEach((category) => {
            if (String(category._id) === String(record.categoryId)) {
              category.selected = true;
            } else {
              category.selected = false;
            }
          });
          return res.render("edit", { record, categories });
        })
        .catch((err) => console.log(err));
    });
});
// 提交編輯
router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id; // record 的 id
  const { name, date, amount, category } = req.body;
  Record.findByIdAndUpdate(
    { _id, userId },
    {
      name,
      date,
      amount,
      userId,
      categoryId: category,
    }
  )
    .then(() => {
      res.redirect("/");
    })
    .catch((e) => {
      console.log(e);
    });
});

// 刪除
router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  return Record.findByIdAndDelete({ _id, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
