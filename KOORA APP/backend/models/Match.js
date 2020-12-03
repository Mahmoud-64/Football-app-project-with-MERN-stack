const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let matchSchema = new Schema({
  homeTeam: {
    type: String
  },
  awayTeam: {
    type: String
  },
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  duration: {
    type: Number,
  },
  homeTeamScore: {
    type: Number
  },
  awayTeamScore: {
    type: Number
  },
  isActive: {
    type: Boolean,
    default: false
  },
  league: {
    type: String
  },
}, {
  collection: 'matches'
})

module.exports = mongoose.model('Match', matchSchema)

