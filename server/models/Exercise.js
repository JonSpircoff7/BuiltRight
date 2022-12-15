const mongoose = require("mongoose");

const { Schema } = mongoose;

const Bodypart = require("./Bodypart");

const exerciseSchema = new Schema({
  id: {
    // type: DataTypes.INTEGER,
       type: Number,
    // prevents null values
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // bodypart: [Bodypart.schema],
  image: {
    type: String,
  },
  difficulty: {
    type: String,
  },
  instructions: {
    type: String,
  },
  weight: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  bodypart: [
    {
    type: Schema.Types.ObjectId,
    ref: "Bodypart",
  }
  ],
  reps: {
    type: Number,
    required: true,
    default: 0,
  },
  sets: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
