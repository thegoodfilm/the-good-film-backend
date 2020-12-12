const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const diarySchema = new Schema({
  movieID: { type: String, required: true },
  movieTitle: { type: String },
  date: { type: String },
  place: { type: String },
  people: { type: String },
  mood: { type: String },
  notes: { type: String},
  userId: {
    type: Schema.Types.ObjectId,
    
    ref: 'User'
},
});

const Diary = mongoose.model("Diary", diarySchema);

module.exports = Diary;
