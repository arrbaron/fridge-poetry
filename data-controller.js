const Fridge = require("./models/fridge");

module.exports.getData = function(req, res) {
  Fridge.find({}, (err, fridges) => {
    if (err) {
      return res.status(500).send("couldn't run the query");
    }
    res.json({data: fridges});
  });
};

module.exports.postData = function(req, res) {
  let fridge = new Fridge(req.body);
  fridge.save(err => {
    if (err) {
      return res.status(500).send("could not save the user");
    }
    res.status(200).send("added a fridge");
  })
};