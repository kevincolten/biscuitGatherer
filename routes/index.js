var express = require('express');
var router = express.Router();
var Json = require('../models/geo');
var User = require('../models/user');
var Spot = require('../models/spot');
var mid = require('../middleware');

// GET /profile
router.get('/profile', function(req, res, next) {
  if (! req.session.userId ) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      return res.render('profile', { title: 'Profile', name: user.name, favorite: user.favoriteSkater, location: user.location });
    }
  });
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

// GET /login
router.get('/login', mid.loggedOut, function(req, res, next) {
  return res.render('login', { title: 'Log In'});
});

// POST /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      }  else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', mid.loggedOut, function(req, res, next) {
  return res.render('register', { title: 'Sign Up' });
});

// POST /register
router.post('/register', function(req, res, next) {
  if (req.body.email &&
    req.body.name &&
    req.body.favoriteSkater &&
    req.body.password &&
    req.body.confirmPassword) {

    // confirm that user typed same password twice
    if (req.body.password !== req.body.confirmPassword) {
      var err = new Error('Passwords do not match.');
      err.status = 400;
      return next(err);
    }

    // create object with form input
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteSkater: req.body.favoriteSkater,
      password: req.body.password
    };

    // use schema's `create` method to insert document into Mongo
    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /about
router.get('/about', mid.requiresLogin,  function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

//GET / map
router.get('/map', mid.requiresLogin, function(req, res, next) {
  return res.render('map', { title: 'SpotHunter'})
});


// Form / map
router.post('/spotForm', function(req, res, next) {

  // return res.send("somestuff");
  console.log("here I am");
  var spotData = {
    type: req.body.type,
    spotName: req.body.spotName,
    coordinates: req.body.coordinates,
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
      return res.redirect('/map');
    }
  });
});

// UserRoutes
router.get('/ourjson/:name', function(req, res){
  if(req.params.name){
    Spot.findOne({name: req.params.name}, {}, function (err, docs){
      res.json(docs);
    })
  }
});
router.get('/ourmaplayers', function (req, res) {
  Spot.find({},{'name': 1}, function (err, docs) {
    res.json(docs);
  });
});



router.get('/map', function(req, res, next) {
  if (! req.session.userId ) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
  User.findById(req.session.userId)
  .exec(function (error, user) {
    if (error) {
      return next(error);
    } else {
      return res.render('map', { title: 'SpotHunter', spotLocal: user.location });
    }
  });
});

//  router.get('/mapjson/:name', function(req, res){
//    if(req.params.name){
//      Json.findOne({name: req.params.name}, {}, function (err, docs){
//        res.json(docs);
//      })
//    }
//  });
// router.post("/mapjson/:name",function (req, res, next){
//   let newLocation = {
//     type: req.body.type,
//     name: req.body.name,
//     color: req.body.color,
//     style: req.body.style,
//     coordinates: req.body.coordinates,
//   }
//   Json.create(newLocation, function (err, spot) {
//     if (err) {
//       return next(err);
//     }else{
//       //this should redirect to the map page
//       return res.redirect('/map');
//     }
//   });
//   // Json.push(newUser);
//   // res.json(newUser);
// });

// router.get('/maplayers', function (req, res) {
//   Json.find({},{'name': 1}, function (err, docs) {
//     res.json(docs);
//   });
// });

// router.get('/map', function(req,res) {
//   Json.find({},{}, function(e,docs){
//     res.render('map', {
//       "jmap" : docs,
//       lat : 30.26008090413479,
//       lng : -97.90324424356912
//     });
//   });
// });


module.exports = router;






