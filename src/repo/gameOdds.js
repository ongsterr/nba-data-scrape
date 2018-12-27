const mongoose = require('mongoose')

const GameOdds = require('../models/GameOdds')
const { databaseConfig } = require('../config')

const gameOddsRepo = () => {
  const saveData = async teamOdds => {
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
      concat: teamOdds.concat,
    }
    await GameOdds.findOneAndUpdate(
      condition,
      teamOdds,
      databaseConfig.dbUpdateOptions
    )
  }

  return {
    saveData,
  }
}

module.exports = gameOddsRepo
