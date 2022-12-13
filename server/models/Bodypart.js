const mongoose = require("mongoose");

const { Schema } = mongoose;

const bodypartSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
});

const Bodypart = mongoose.model("Bodypart", bodypartSchema);

module.exports = Bodypart;
