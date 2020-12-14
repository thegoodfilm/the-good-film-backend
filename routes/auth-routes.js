const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

// POST SIGN UP
authRoutes.post("/signup", (req, res, next) => {
  const { name, lastName, username, email, password } = req.body;

  if (!name || !lastName || !username || !email || !password) {
    res.send({ message: "You have to complete all the fields" });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).send({ message: "Email check went bad." });
      return;
    }
    if (foundUser) {
      res.send({
        message: "Email already in use. Please, choose another one or login.",
      });
      return;
    }

    const salt = bcrypt.genSaltSync(10);

    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      name: name,
      lastName: lastName,
      username: username,
      email: email,
      password: hashPass,
    });

    aNewUser.save((err) => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      req.login(aNewUser, (err) => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }
        res.status(200).json(aNewUser);
      });
    });
  });
});

// POST LOG IN
authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.send({ message: "You have to introduce email & password" });
      return;
    }
    if (err) {
      res.send({ message: "Error authenticating user" });
      return;
    }
    if (!theUser) {
      res.send({ message: "Incorrect email/password" });
      return;
    }
    req.login(theUser, (err) =>
      err
        ? res.send({ message: "Incorrect username/password" })
        : res.status(200).json(theUser)
    );
  })(req, res, next);
});

// POST LOG OUT
authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

// GET LOGGED IN
authRoutes.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.json({});
});

// GET USER
authRoutes.get("/getUser/:id", (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = authRoutes;
