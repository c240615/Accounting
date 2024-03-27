const db = require("../../config/mongoose");
// model
const User = require("../user");
const Record = require("../record");
const Category = require("../category");
// data
const userData = require("../datas/user.json");
const recordData = require("../datas/record.json");
// bcrypt
const bcrypt = require("bcryptjs");

db.once("open", () => {
  Promise.all(
    userData.map((eachUser) => {
      // 密碼雜湊
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(eachUser.password, salt))
        .then((hash) =>
          // 建立使用者資料
          User.create({
            name: eachUser.name,
            email: eachUser.email,
            password: hash,
          })
        )
        .then((user) => {
          console.log('User seed done')
          // 各使用者的紀錄
          const userRecord = [];
          // 各使用者的 id
          const userId = user._id;
          // 利用各使用者的 todo 陣列整理各使用者的紀錄
          const record = eachUser.todo.map((recordIndex) => {
            recordData[recordIndex].userId = userId;
            return recordData[recordIndex];
          });
          // 將類別加入各使用者的紀錄
          return Promise.all(
            record.map((record) => {
              return Category.findOne({ name: record.category })
                .lean()
                .then((category) => {
                  record.categoryId = category._id;
                  userRecord.push(record);
                });
            })
          ).then(() => {
            return Record.create(userRecord);
          });
        });
    })
  )
    .then(() => {
      process.exit();
    })
    .catch((err) => console.log(err));
});
