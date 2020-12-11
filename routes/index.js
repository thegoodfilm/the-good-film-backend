const express = require('express');
const User = require('../models/User');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.send('Home')
});



router.post('/favourites', (req, res)=>{
 const newFavourite = req.body.favourites;
console.log(favourites)
  User.findOne({ newFavourite}, (foundFavourite) => {

console.log(foundFavourite)
	if (foundFavourite) {

	res.send({ message: 'You already have this movie in your favourites.' });
			return
		} if(err){

      User.findByIdAndUpdate(req.body.userID, {$push: {favourites: req.body.movieID}})
      .then((result)=>{
        console.log(result)
        console.log('hola')
      })
      .catch((err)=>{
        console.log(err)
      })
      
    }
  
})})




// router.post('/favourites', (req, res)=>{
//   const newFavourite = req.body.favourites;
// console.log(favourites)
//   User.findOne({ favourites: newFavourite}, (err, foundFavourite) => {


// 		if (foundFavourite) {
//       console.log('hola')
// 			res.send({ message: 'You already have this movie in your favourites.' });
// 			return
// 		} if(err){

//       User.findByIdAndUpdate(req.body.userID, {$push: {favourites: req.body.movieID}})
//       .then((result)=>{
//         console.log(result)
//         console.log('hola')
//       })
//       .catch((err)=>{
//         console.log(err)
//       })
      
//     }
  
// })})

router.post('/favourites', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {favourites: req.body.movieID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})


router.post('/watchlist', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {watchlist: req.body.movieID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post('/activity', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {activity: req.body.movieID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})

router.post('/ratings', (req, res)=>{
  User.findByIdAndUpdate(req.body.userID, {$push: {ratings: req.body.movieID}})
  .then((result)=>{
    console.log(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})


router.get('/myprofile/:id', (req, res)=>{

  User.findById(req.params.id)
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    console.log(err)
  })
})






/* GET: Ver todos los usuarios */
router.get('/all-users', (req, res)=>{
  User.find({})
  .then((result)=>{
    res.send(result)
  })
  .catch((err)=>{
    res.send(err)
  })
})



/* PUT: Editar usuario */

/* PUT: Editar Leidos */

/* PUT: Editar Leyendo */

/* PUT: Editar Por Leer */

/* DELETE: Eliminar usuario */





module.exports=router