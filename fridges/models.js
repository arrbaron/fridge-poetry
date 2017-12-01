const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const FridgeSchema = mongoose.Schema({
  firstName: "String",
  lastName: "String"
});

const Fridge = mongoose.model("Fridge", FridgeSchema);

module.exports = Fridge;