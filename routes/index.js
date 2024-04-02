const express = require("express");
const router = express.Router();
// 各 router
const home = require("./modules/home");
const records = require("./modules/records");
const users = require("./modules/users");
const auth = require("./modules/auth");
// 驗證登入狀態
const { authenticator } = require("../middleware/auth");
// 進入各 router
router.use("/records", authenticator, records);
router.use("/users", users);
router.use("/auth", auth);
router.use("/", authenticator, home);

module.exports = router;
