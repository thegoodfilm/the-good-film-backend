const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  movieID: { type: String,  required: true },
  username: { type: String, ref: "User", required: true},
  date:{ type: Date, default: Date.now},
  reviewText: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User",  required: true},
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
