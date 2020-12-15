const express = require("express");


const Review = require("../models/Review");
const { populate } = require("../models/User");
const router = express.Router();

// GET REVIEWS
router.get("/review/:id", (req, res, next) => {
  console.log(req.body)
  console.log(req.match)
  console.log(req.params)

    console.log('soy detreview')
  Review.find({ movieID: req.params.movieID })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// POST REVIEW FORM
router.post("/review/:id/form", (req, res, next) => {
  const review = req.body.reviewText


  if (!review) {
    res.send({ message: "You have to insert some text" });
    return;
  }

  Review.create({
    movieID: req.body.movieID,
    reviewText: req.body.reviewText,
    owner: req.user._id
   
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
