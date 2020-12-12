const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favourites: { type: [String]},
  watchlist: { type: [String] },
  activity: { type: [String] },
  diary: {type: Schema.Types.ObjectId, ref: "Diary" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;

