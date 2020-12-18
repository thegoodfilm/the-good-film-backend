const express = require("express");

const Review = require("../models/Review");
const { populate } = require("../models/User");
const router = express.Router();



router.get("/details/:id", (req, res, next) => {

  Review.find({ movieID: req.params.id })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// POST REVIEW FORM
router.post("/details/:id", (req, res, next) => {



  Review.create({
    movieID: req.params.id,
    reviewText: req.body.reviewText,
    username: `${req.user.username}`,
    owner: req.user._id,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET REVIEWS
router.get("/getReviews/:id", (req, res) => {
  Review.findById(req.params.id)
    .populate("user")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
