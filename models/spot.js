let mongoose = require('mongoose');
let SpotSchema = new mongoose.Schema({

    spotName: {
      type: String,
      trim: true,
    },
    coordinates: {
      type: [Number, Number]
    },
    comment: {
      type: String,
    },
    pics: {
      type: String,
    },
    spotUser: {
      type: String,
    },
});

let Spot = mongoose.model('Spot', SpotSchema);

module.exports = Spot;


