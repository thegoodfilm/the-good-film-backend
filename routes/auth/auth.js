const express     = require('express');
const router = express.Router();
const passport    = require('passport');
const bcrypt      = require('bcryptjs');

const User = require('../models/User');

//POST SIGN UP

router.post('/signup', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		res.status(400).json({ message: 'Please, enter email and password' });
		return;
	}

	if (password.length < 8) {
		res
			.status(400)
			.json({ message: 'Please make your password at least 8 characters long for security purposes.' });
		return;
	}

	User.findOne({ email }, (err, foundUser) => {
		if (err) {
			res.status(500).json({ message: 'Username check went bad.' });
			return;
		}

		if (foundUser) {
			res.status(400).json({ message: 'This email is already in use. If you have an account please log in else try with another email' });
			return;
		}

		const salt = bcrypt.genSaltSync(10);
		const hashPass = bcrypt.hashSync(password, salt);

		const aNewUser = new User({
      username,
      lastName,
      username,
      email,
      country,
      password: hashPass
  
		});

		aNewUser.save((err) => {
			if (err) {
				res.status(400).json({ message: 'Saving user to database went wrong.' });
				return;
			}

			req.login(aNewUser, (err) => {
				if (err) {
					res.status(500).json({ message: 'Login after signup went bad.' });
					return;
				}

				res.status(200).json(aNewUser);
			});
		});
	});
});

// authRoutes.post('/login', (req, res, next) => {
// 	passport.authenticate('local', (err, theUser, failureDetails) => {
// 		if (err) {
// 			res.status(500).json({ message: 'Something went wrong authenticating user' });
// 			return;
// 		}

// 		if (!theUser) {
// 			// "failureDetails" contains the error messages
// 			// from our logic in "LocalStrategy" { message: '...' }.
// 			res.status(401).json(failureDetails);
// 			return;
// 		}

// 		// save user in session
// 		req.login(theUser, (err) => {
// 			if (err) {
// 				res.status(500).json({ message: 'Session save went bad.' });
// 				return;
// 			}

// 			// We are now logged in (that's why we can also send req.user)
// 			res.status(200).json(theUser);
// 		});
// 	})(req, res, next);
// });

router.post('/login', passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))

router.post('/logout', (req, res, next) => {
  req.logout();
  res.status(200).json({ message: 'Log out success!' });
});

router.get('/loggedin', (req, res, next) => {
  if (req.isAuthenticated()) {
      res.status(200).json(req.user);
      return;
  }
  res.json({ });
});

module.exports = router;