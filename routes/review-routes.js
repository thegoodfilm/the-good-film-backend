const express = require("express");

const Review = require("../models/Review");
const { populate } = require("../models/User");
const router = express.Router();

// GET REVIEWS
// router.get("/review/:id", (req, res, next) => {
// console.log(req.params.id)
//   Review.find({id: req.params.id})
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.error(err);
//       res.json(err);
//     });
// });

router.get("/details/:id", (req, res, next) => {
  console.log(req.params.id);
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
  console.log("soy post review");
  console.log(req.params);
  // const review = req.body.reviewText

  console.log(req.user);
  // if (!review) {
  //   res.send({ message: "You have to insert some text" });
  //   return;
  // }

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
