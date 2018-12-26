const mongoose = require('mongoose')

const PlayerStats = require('../models/PlayerStats')
const { databaseConfig } = require('../config')

const playerStatsRepo = () => {
  if (mongoose.connection.readyState === 0) {
    mongoose.connect(
      databaseConfig.dbUrl(),
      databaseConfig.mongoOptions,
      () => {
        console.log('Established connection to MongoDB')
      }
    )
  }

  const saveData = async playerData => {
    const condition = {
      concat: playerData.concat,
    }
    await PlayerStats.findOneAndUpdate(
      condition,
      playerData,
      databaseConfig.dbUpdateOptions
    )
  }

  return {
    saveData,
  }
}

module.exports = playerStatsRepo
