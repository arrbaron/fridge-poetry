const mongoose = require("mongoose");

const fridgeSchema = mongoose.Schema({
  "votes": {type: Number, required: true},
  "dates": {type: Number, required: true},
  "unused-words": [String],
  "used-words": [String],
  "authors": [String]
});

const Fridge = mongoose.model("Fridge", fridgeSchema);

module.exports = Fridge;