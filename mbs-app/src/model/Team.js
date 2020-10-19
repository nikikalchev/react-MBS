const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: String
  },
},{ versionKey: false });

module.exports = mongoose.model('Team', teamSchema);