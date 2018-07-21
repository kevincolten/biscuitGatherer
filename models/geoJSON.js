// routes/index.js
// Mongoose Schema definition
var Schema = mongoose.Schema;
var JsonSchema = new Schema({
  name: String,
  type: Schema.Types.Mixed
});

// Mongoose Model definition
var Json = mongoose.model('Json', JsonSchema, 'geoJSON');
