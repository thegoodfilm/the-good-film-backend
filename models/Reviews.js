const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
 
  username: {type: Schema.Types.ObjectId,ref: "User"},
  review: { type: String, required: true, unique: true },
 
  owner: {type: Schema.Types.ObjectId,ref: "User"}
});

const Review = mongoose.model("User", reviewSchema);

module.exports = Review;

