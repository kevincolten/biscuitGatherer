var  mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },

  favoriteSkater: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  spotName: {
    type: String,
    trim: true,
  },
  // location: {
  //   type: String,
  // },
  comment: {
    type: String,
  },
  pics: {
    type: String,
  },
  spotUser: {
    type: String,
  },
  location: {

    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      // required: true
    },
    coordinates: {
      type: [String],
      required: true
    }
  },
});
// authenticate input against database documents
UserSchema.statics.authenticate = function(email, password, callback) {
  User.findOne({email: email})
  .exec(function (error, user){
    if(error) {
      return callback(error);
    } else if(!user){
      var err = new Error('User not found.');
      err.staus = 401;
      return callback(err)
    }
    bcrypt.compare(password, user.password, function(error, result) {
      if (result === true){
        return callback(null, user);
      } else{
        return callback();
      }
    })
  });
}
//hash password before saving to the database. mongoose prebuilt method
UserSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err){
      return next(err);
    }
    user.password = hash;
    next();
  })
});

var User = mongoose.model('User',  UserSchema);
module.exports = User;
