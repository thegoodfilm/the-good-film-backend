const express = require('express');
const User = require('../models/User');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
});




router.post('/myaccount/favourites', (req, res)=>{

  User.findOne({ favourites: req.body.movieID}, function(err, favourite){
      if (err) {
        console.log('post error: ', err)
        }
      else if (favourite) {
        console.log("already exsist")
        res.send({ message: "You already have this movie on your favourites" });

      }
      else {
        User.findByIdAndUpdate(req.body.userID, {$push: {favourites: req.body.movieID}})
              .then((result)=>{
                console.log(result)
                res.send({ message: "Added to your favourites" });
              })
              .catch((err)=>{
                console.log(err)
              })
       
      }
  })
})


router.post('/myaccount/watchlist', (req, res)=>{

  User.findOne({ watchlist: req.body.movieID}, function(err, watchlist){
      if (err) {
        console.log('post error: ', err)
        }
      else if (watchlist) {
        console.log("already exsist")
        res.send({ message: "You already have this movie on your watchlist" });

      }
      else {
        User.findByIdAndUpdate(req.body.userID, {$push: {watchlist: req.body.movieID}})
              .then((result)=>{
                console.log(result)
                res.send({ message: "Added to your watchlist" });
              })
              .catch((err)=>{
                console.log(err)
              })
       
      }
  })
})


router.post('/myaccount/activity', (req, res)=>{

  User.findOne({ activity: req.body.movieID}, function(err, activity){
      if (err) {
        console.log('post error: ', err)
        }
      else if (activity) {
        console.log("already exsist")
        res.send({ message: "You already have this movie on your activity" });

      }
      else {
        User.findByIdAndUpdate(req.body.userID, {$push: {activity: req.body.movieID}})
              .then((result)=>{
                console.log(result)
                res.send({ message: "Added to your activity" });
              })
              .catch((err)=>{
                console.log(err)
              })
       
      }
  })
})





router.post(
  "/myaccount/activity/:id/remove",
  (req, res, next) => {
    const id = req.params.id;
    User.findByIdAndDelete(id)
      .then(() => {
        res.send({ message: "Removed" });
      })
      .catch((err) => {
        console.log(err);
        res.render("error");
      });
  }
);


router.get('/getUser/:id', (req, res)=>{

  User.findById(req.params.id)
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

module.exports=router