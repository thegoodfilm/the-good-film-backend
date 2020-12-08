const express 		= require("express");
const authRoutes 	= express.Router();
const passport 		= require("passport");
const bcrypt 			= require("bcryptjs");

const User = require("../models/User");

authRoutes.post("/signup", (req, res, next) => {
	
  const { name, lastName, username, email, password } = req.body;

  if (!name || !lastName || !username || !email || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Email check went bad." });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Email taken. Choose another one." });
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

authRoutes.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, theUser, failureDetails) => {
      if (err) {
          res.status(500).json({ message: 'Error authenticating user' });
          return;
      }
      if (!theUser) {
          res.status(401).json(failureDetails);
          return;
      }
      req.login(theUser, err => err ? res.status(500).json({ message: 'Session error' }) : res.status(200).json(theUser))
  })(req, res, next)
})

authRoutes.post("/logout", (req, res, next) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.json({});
});

module.exports = authRoutes;
