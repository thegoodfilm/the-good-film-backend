const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema({
  movieID: { type: String, required: true},
  date: { type: String, required: true },
  place: { type: String },
  people: { type: String },
  notes: { type: String },
  owner: {type: Schema.Types.ObjectId,ref: "User"
  },
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
