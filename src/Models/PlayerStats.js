const mongoose = require('mongoose')
const { Schema } = mongoose

const PlayerStatSchema = new Schema({
  date: Date,
  playerId: String,
  playerName: String,
  team: String,
  pos: String,
  opp: String,
  pts: Number,
  reb: Number,
  ast: Number,
  blk: Number,
  stl: Number,
  fgp: Number,
  ftp: Number,
  tpp: Number,
  ftm: Number,
  twopm: Number,
  threepm: Number,
  to: Number,
  min: Number,
  dd: Number,
  td: Number,
  fpts: Number,
  concat: String,
})

const PlayerStatModel = mongoose.model('PlayerStat', PlayerStatSchema)

module.exports = PlayerStatModel
