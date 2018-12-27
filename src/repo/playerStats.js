const mongoose = require('mongoose')

const PlayerStats = require('../models/PlayerStats')
const { databaseConfig } = require('../config')

const playerStatsRepo = () => {
  const saveData = async playerData => {
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(
        databaseConfig.dbUrl(),
        databaseConfig.mongoOptions,
        () => {
          console.log('Established connection to MongoDB')
        }
      )
    }

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
