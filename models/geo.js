// routes/index.js
// Mongoose Schema definition
let mongoose = require('mongoose');
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  name: String,
  type: Schema.Types.Mixed,
  color: String,
  style: String,
  coordinates: [String]
});

// Mongoose Model definition
var Json = mongoose.model('Json', JsonSchema, 'layercollection');
module.exports = Json;
