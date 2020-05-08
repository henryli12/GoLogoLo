var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  texts: Array,
  textLocations: [[]],
  textColors: Array,
  fontSizes: Array,
  images: Array,
  imageLocations: [[]],
  backgroundColor: String,
  borderColor: String,
  borderWidth: { type: Number, min: 0, max: 100 },
  borderRadius: { type: Number, min: 0, max: 100 },
  padding: { type: Number, min: 0, max: 100 },
  location: Array,
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);