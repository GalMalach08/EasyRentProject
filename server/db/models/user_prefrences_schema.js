const mongoose = require("mongoose");

const userPrefrencesSchema = new mongoose.Schema({
  roomsNumber: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  area: {
    type: Array,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const userPrefrences = mongoose.model("userPrefrences", userPrefrencesSchema);
module.exports = userPrefrences;
