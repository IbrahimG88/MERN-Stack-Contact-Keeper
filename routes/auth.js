const express = require("express");
const router = express.Router();

/* POST api/users, means it will be using this route since in server.js we have:
app.use("/api/users", require("./routes/users"));
*/

// @route  GET api/auth
// @desc   Get logged in user
// @access Private
router.get("/", (req, res) => {
  res.send("Get logged in user");
});

// @route  POST api/auth
// @desc   Auth user & get token
// @access Public
router.post("/", (req, res) => {
  res.send("Log in user");
});

module.exports = router;

//hello world
