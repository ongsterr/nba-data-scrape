const mongoose = require('mongoose')

const PlayerProj = require('../models/PlayerStatsProj')
const { databaseConfig } = require('../config')

const playerProjRepo = () => {
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
    await PlayerProj.findOneAndUpdate(
      condition,
      playerData,
      databaseConfig.dbUpdateOptions
    )
  }

  return {
    saveData,
  }
}

module.exports = playerProjRepo
