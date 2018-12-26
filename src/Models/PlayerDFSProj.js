const mongoose = require('mongoose')
const { Schema } = mongoose

const PlayerDFSProjSchema = new Schema({
  playerId: String,
  team: String,
  pos: String,
  opp: String,
  oppRank: Number,
  oppPosRank: Number,
  proj: Number,
  projPerDollar: Number,
  salary: Number,
  platform: String,
})

PlayerDFSProjSchema.pre('save', function(next) {
  this.projPerDollar = this.proj / this.salary
  next()
})

const PlayerDFSProjModel = mongoose.model('PlayerDFSProj', PlayerDFSProjSchema)

module.exports = PlayerDFSProjModel
