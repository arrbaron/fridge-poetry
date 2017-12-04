const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const FridgeSchema = mongoose.Schema({
  wordBank: [String],
  poems: [{
    words: [String],
    authors: [String]
  }],
  authors: [String]
});

const Fridge = mongoose.model("Fridge", FridgeSchema);

module.exports = {Fridge};