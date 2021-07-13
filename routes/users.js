const express = require("express");
const router = express.Router();

/* POST api/users, means it will be using this route since in server.js we have:
app.use("/api/users", require("./routes/users"));
*/

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post("/", (req, res) => {
  res.send("Register a user");
});

module.exports = router;
