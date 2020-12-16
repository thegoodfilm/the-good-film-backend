const express = require("express");

const Diary = require("../models/Diary");
const { populate } = require("../models/User");
const router = express.Router();

// GET MYACCOUNT/DIARY
router.get("/myaccount/diary", (req, res, next) => {
  Diary.find({ owner: req.user._id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
      res.json(err);
    });
});

// POST MYACCOUNT/DIARY FORM
router.post("/myaccount/diary/:id", (req, res, next) => {
  console.log(req.body)
  const date = req.body.date;

  if (!date) {
    res.send({ message: "You have to insert date" });
    return;
  }

  Diary.create({
    movieID: req.body.movieID,
    date: req.body.date,
    place: req.body.place,
    people: req.body.people,
    notes: req.body.notes,
    owner: req.user._id,
  })
  
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET DIARY
router.get("/getDiary/:id", (req, res) => {
  Diary.findById(req.params.id)
    .populate("user")
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
