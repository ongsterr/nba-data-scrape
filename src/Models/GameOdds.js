const mongoose = require('mongoose')
const { Schema } = mongoose

const GameOddsSchema = new Schema({
  date: Date,
  team: String,
  isHome: Boolean,
  isFavorite: Boolean,
  spread: Number,
  total: Number,
})

GameOddsSchema.pre('save', function(next) {
  if (this.team.substring(0, 2) == 'at') {
    this.isHome = true
  }

  if (this.isFavorite) {
    this.spread = -this.spread
  }

  next()
})

const GameOddsModel = mongoose.model('GameOdds', GameOddsSchema)
