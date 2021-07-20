const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const { check, validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");

const config = require("config");

/* POST api/users, means it will be using this route since in server.js we have:
app.use("/api/users", require("./routes/users"));
*/

// @route  POST api/users
// @desc   Register a user
// @access Public
router.post(
  "/",
  [
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //  res.send(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // we are checking if the user already exists before
      // seacrh for a User that has an email that matches the one from the request body
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
      // if the user doesn't exist: create a new user using the User mongoose model
      // same name: name, email: email
      // we set the new User name as from this const:     const { name, email, password } = req.body;
      user = new User({
        name,
        email,
        password,
      });

      // now we want to encrypt or hash the password before passing it to the database, using bcrypt
      const salt = await bcrypt.genSalt(10);
      // genSalt generates a salt
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

      // you can check its saved in the mongodb atlas cluster and you will find the password hashed
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;

// we will add validation to the request body using the package express validator
