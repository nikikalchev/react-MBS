const mongoose = require("mongoose");

const bettingSchema = new mongoose.Schema({
  matchId: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  prediction: {
    type: String
  },
  match_points: {
    type: Number
  },
},{ versionKey: false });


module.exports = mongoose.model('Bettings', bettingSchema);