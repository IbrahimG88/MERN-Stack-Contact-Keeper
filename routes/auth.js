const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const config = require("config");

const User = require("../models/User");

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
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // checking the email
      let user = await User.findOne({ email });

      if (!user) {
        // no user exists in our database with these credentials
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      // check the password
      // comapre the password the user logging in is inserting in the form with the hashed password we have in mongodb collection for that user
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invaild Credentials" });
      }

      const payload = {
        user: {
          // this id is added by mongodb atlas when the object is added automatically
          id: user.id,
        },
      };

      // expiresIn means when to expire our session login or the jwt token and needs to be reinserted
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
          // copy the token in the postman post request you will find the user with its id created
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;

//hello world
