const mongoose = require('mongoose')

const DfsProj = require('../models/PlayerDFSProj')
const { databaseConfig } = require('../config')

const dfsProjRepo = () => {
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
    await DfsProj.findOneAndUpdate(
      condition,
      playerData,
      databaseConfig.dbUpdateOptions
    )
  }

  return {
    saveData,
  }
}

module.exports = dfsProjRepo
