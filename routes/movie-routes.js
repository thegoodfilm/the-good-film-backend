const express = require("express");

const User = require("../models/User");
const router = express.Router();

// POST MYACCOUNT/FAVOURITES
router.post("/myaccount/favourites", (req, res) => {
  console.log("========= Find /myaccount/favourites")
  console.log(req.body)
  console.log(req.body.movieID)
  console.log(req.body.email)
  console.log("===============================")
  User.findOne({ favourites: req.body.movieID, _id: req.body.userID })
  .then((result) => {
    console.log(result)
    if (result === null) {

      User.findByIdAndUpdate(req.body.userID, {
        $push: { favourites: req.body.movieID },
      })
        .then((result) => {
          console.log(result);
          res.send({ message: "Added to your favourites" });
        })
        .catch((err) => {
          console.log(err);
        });
      
      
    } else {
      console.log("already exist");
      
      res.send({ message: "You already have this movie on your favourites" });
    }
      
  })
  .catch((err) => {
    console.log(err);
  });
});

// POST MYACCOUNT/WATCHLIST
router.post("/myaccount/watchlist", (req, res) => {
  User.findOne({ watchlist: req.body.movieID }, function (err, watchlist) {
    if (err) {
      console.log("post error: ", err);
    } else if (watchlist) {
      console.log("already exist");
      res.send({ message: "You already have this movie on your watchlist" });
    } else {
      User.findByIdAndUpdate(req.body.userID, {
        $push: { watchlist: req.body.movieID },
      })
        .then((result) => {
          console.log(result);
          res.send({ message: "Added to your watchlist" });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
