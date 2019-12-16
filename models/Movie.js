const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieScheme = new Schema({
  title: {
    type: String,
    required: true
  },
  category: String,
  country: String,
  year: Number,
  imdbScore: Number,
  date: {
    type: Date,
    default: Date.now
  },
  directorId: Schema.Types.ObjectId
});
module.exports = mongoose.model("movie", MovieScheme);
