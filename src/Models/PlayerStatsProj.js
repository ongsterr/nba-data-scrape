const mongoose = require('mongoose')
const { Schema } = mongoose

const PlayerStatProjSchema = new Schema({
  date: Date,
  playerId: String,
  name: String,
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
  fpts: Number,
  concat: String,
})

const PlayerStatProjModel = mongoose.model(
  'PlayerStatProj',
  PlayerStatProjSchema
)

module.exports = PlayerStatProjModel
