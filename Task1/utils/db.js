const mongoose = require("mongoose");
const config = require("../config");

let db = null;
async function init() {
  console.log("connecting to db");
  await mongoose.connect(config.mongo.connection);

  db = mongoose.connection;
}

init()
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

module.exports.default = db;
