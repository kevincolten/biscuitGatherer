var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
// var Spot = require('../models/spot.js');
var mid = require('../middleware');


//GET /login
router.get('/login', mid.loggedOut, function(req, res, next){
  return res.render('login', {title: 'Log In'})
});

//POST /login
router.post('/login', function(req, res, next){
  if(req.body.email && req.body.password){
    User.authenticate(req.body.email, req.body.password, function(error, user){
      if(error || !user){
        var err = new Error('Wrong email or password');
        err.status = 401;
        return next(err)
      }else {
        req.session.userId = user._id;
        return res.redirect('/map');
      }
    })
  }else{
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', mid.loggedOut, function (req, res, next) {
  return res.render('register', {title: 'Sign Up'});
});

router.post('/register', function (req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteSkater &&
    req.body.password &&
    req.body.confirmPassword) {
    console.log("here I am");
// confirm that user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      console.log("we made it here");

      var err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteSkater: req.body.favoriteSkater,
      password: req.body.password
    };

    //use schema create method to insert documents into Mongo
    User.create(userData, function (err, user) {
      if (err) {
        return next(err);

      } else {
        return res.redirect('/map')
      }
    })

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err)
  }
});
//GET logout
router.get('/logout', function(req, res, next){
  if(req.session){
    req.session.destroy(function(err){
      if(err){
        return next(err);
      }else{
        return res.redirect('/');
      }
    })
  }
});

//GET home
router.get('/', function (req, res, next) {
  return res.render('index', {title: 'Spot Hunter'});
});
// GET /about
router.get('/about', function (req, res, next) {
  return res.render('about', {title: 'About'});
});

router.get('/profile', function (req, res, next) {
  if(!req.session.userId){
    var err = new Error("You are Not authorized to view this page");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
  .exec(function (error, user){
    if(error){
      return next(error);
    }else{
      return res.render('profile', {title: "Profile", name: user.name, favorite: user.favoriteSkater})
    }
  })
});



//Get /contact
router.get('/contact', function (req, res, next) {
  return res.render('contact', {title: 'Contact'});
});
router.get('/spotForm', function(req, res, next){
  return res.render('spotForm', {title: 'Spot Form'})
});
router.get('/map', function (req, res, next) {
  return res.render('map', {title: 'SpotHunter'});
});


router.post('/spotForm', function(req, res, next) {
  // return res.send("somestuff");
  console.log("here I am");
  var spotData = {
    spotName: req.body.spotName,
    location: req.body.location,
    comment: req.body.comment,
    pics: req.body.pics,
    spotUser: req.body.spotUser
  };
  // use schema create method to insert documents into Mongo
  User.update(spotData, function (err, spot) {
    if (err) {
      return next(err);
    }else{
      //this should redirect to the map page

      return res.redirect('/profile');
    }
  });
});


//use schema create method to insert documents into Mongo
// Spot.create(spotData, function (err, user) {
//   if (err) {
//     return next(err);
//
//   } else {
//     return res.redirect('/profile')
//   }
// })
//
// } else {
//   var err = new Error('All fields required.');
//   err.status = 400;
//   return next(err)
// }
// });
module.exports = router;




//GET /
// exports.index = function(req, res, next){
//   res.render('index', {title: 'Spot Hunter'})
// }
//why does this work?
// POST /register
// router.post('/register', function(req, res, next){
//   console.log("this works!");
//   res.send('user created')
// });

