const mongoose = require("mongoose");

const { Schema } = mongoose;

const bodypartSchema = new Schema({
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
});

const Bodypart = mongoose.model("Bodypart", bodypartSchema);

module.exports = Bodypart;
