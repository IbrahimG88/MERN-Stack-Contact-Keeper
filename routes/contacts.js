const express = require("express");
const router = express.Router();

/* POST api/users, means it will be using this route since in server.js we have:
app.use("/api/users", require("./routes/users"));
*/

// @route  GET api/contacts
// @desc   Get all users contacts
// @access Private
router.get("/", (req, res) => {
  res.send("Get all contacts");
});

// @route  POST api/contacts
// @desc   Add new contact
// @access Private
router.post("/", (req, res) => {
  res.send("Add new contact");
});

// @route  POST api/contacts/:id
// @desc   Update contact
// @access Private
router.put("/:id", (req, res) => {
  res.send("Update contact");
});

// @route  DELETE api/contacts/:id
// @desc   Delete contact
// @access Private
router.delete("/:id", (req, res) => {
  res.send("Delete contact");
});

module.exports = router;
