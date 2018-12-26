const mongoose = require('mongoose')
const { Schema } = mongoose

const GameOddsSchema = new Schema({
  date: Date,
  team: String,
  isHome: Boolean,
  isFavorite: Boolean,
  spread: Number,
  total: Number,
  concat: String,
})

const GameOddsModel = mongoose.model('GameOdds', GameOddsSchema)

module.exports = GameOddsModel
