var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
// var fs = require('fs');
// var MongoStore = require('connect-mongo')(session);
// var multer = require('multer');
 var app = express();



// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: function(req, file, cb){
//     cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
// // Init Upload
// const upload = multer({
//   storage: storage,
//   limits:{fileSize: 1000000},
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('avatar');

// // File input field name is simply 'file'
// app.post('/register', upload.single('file'), function(req, res) {
//   var file = __dirname + '/' + req.file.filename;
//   fs.rename(req.file.path, file, function(err) {
//     if (err) {
//       console.log(err);
//       res.send(500);
//     } else {
//       res.json({
//         message: 'File uploaded successfully',
//         filename: req.file.filename
//       });
//     }
//   });
// });




// mongodb connection
mongoose.connect("mongodb://jon:bizket1@ds143451.mlab.com:43451/leaflet_map", {

});
// mongoose.connect("mongodb://jon:bizket1@ds121341.mlab.com:21341/spothuntertest", {
//
// });
// mongoose.connect("mongodb://JonLaur:testbase1@ds125821.mlab.com:25821/spothuntertest", {
//
// });


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// use sessions for tracking logins
app.use(session({
  secret: 'Bizkets Loves You',
  resave: true,
  saveUninitialized: false,
  // store: new MongoStore({
  //   mongooseConnection: db
  // })
}));

// make user ID available in templates
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files from /public
app.use(express.static(__dirname + '/public'));

// view engine setup
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



/// multer

// app.use(multer({ dest: '/uploads’',
//   rename: function (fieldname, filename) {
//     return filename;
//   },
//  }));
//  // fs
//  app.post('./register',function(req,res){
//   var newItem = new Item();
//   newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//   newItem.img.contentType = 'image/png';
//   newItem.save();
//  });

// listen on port 3000
app.listen(3001, function () {
  console.log('Express app listening on port 3000');
});