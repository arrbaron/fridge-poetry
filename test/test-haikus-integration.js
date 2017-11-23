const chai = require("chai");
const chaiHTTP = require("chai-http");

const { app } = require("../server");

const should = chai.should();

chai.use(chaiHTTP);

describe("GET endpoint", function () {
  it("should return all existing haikus", function () {
    return chai.request(app)
      .get("/")
      .then(function (res) {
        res.should.have.status(200);
        res.should.be.html;
      });
  });
});