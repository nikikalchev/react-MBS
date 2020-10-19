const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  team1: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  team2: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  goalsTeam1: {
    type: String
  },
  goalsTeam2: {
    type: String
  },
},{ versionKey: false });


module.exports = mongoose.model('Match', matchSchema);