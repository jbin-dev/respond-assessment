const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserVisitSchema = new Schema({
  facebookId: String,
});

const User = mongoose.model("user-visits", UserVisitSchema);

module.exports = User;
